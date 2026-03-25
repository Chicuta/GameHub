/**
 * ===================================================
 * Obsidian → Supabase – Importador de Backup
 * ===================================================
 *
 * Uso:
 *   node scripts/import-ob.mjs
 *
 * Requer no .env:
 *   SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY=eyJhbGciOiJI...  (service_role key)
 *   OB_USER_EMAIL=Filipeaurellio@gmail.com  (email do usuário no Supabase Auth)
 *
 * O script:
 * 1. Lê todos os .md em ob/Jogos (Zerados, Jogando, Abandonados, Pausados)
 * 2. Extrai frontmatter (YAML entre ---)
 * 3. Upsert no catálogo games + user_games
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OB_ROOT = path.resolve(__dirname, '..', 'ob', 'Jogos')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
const USER_EMAIL = process.env.OB_USER_EMAIL || 'Filipeaurellio@gmail.com'

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Defina SUPABASE_URL e SUPABASE_SERVICE_KEY no .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Mapeamento de pastas para status ──────────────
const FOLDER_STATUS = {
  Jogando: 'jogando',
  Abandonados: 'abandonado',
  Pausados: 'pausado',
}
// Zerados ficam em Zerados/<ano>/ → status "zerado"

// ── Parsear frontmatter YAML simples ──────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx < 0) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    if (key && val) fm[key] = val
  }
  return fm
}

// ── Parsear tempo "HH:MM" ou "H:MM" para horas decimais ─
function parseTimeToHours(t) {
  if (!t) return 0
  const s = String(t).trim()
  const hm = s.match(/^(\d+):(\d{2})/)
  if (hm) return parseInt(hm[1]) + parseInt(hm[2]) / 60
  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}

// ── Coletar todos os jogos do vault ───────────────
function collectGames() {
  const games = []

  // Zerados (em subpastas por ano)
  const zeradosDir = path.join(OB_ROOT, 'Zerados')
  if (fs.existsSync(zeradosDir)) {
    for (const yearFolder of fs.readdirSync(zeradosDir)) {
      const yearPath = path.join(zeradosDir, yearFolder)
      if (!fs.statSync(yearPath).isDirectory()) continue
      for (const file of fs.readdirSync(yearPath)) {
        if (!file.endsWith('.md')) continue
        const content = fs.readFileSync(path.join(yearPath, file), 'utf-8')
        const fm = parseFrontmatter(content)
        games.push({
          nome: file.replace('.md', ''),
          ...fm,
          status: 'zerado',
        })
      }
    }
  }

  // Jogando, Abandonados, Pausados
  for (const [folder, status] of Object.entries(FOLDER_STATUS)) {
    const dir = path.join(OB_ROOT, folder)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue
      const content = fs.readFileSync(path.join(dir, file), 'utf-8')
      const fm = parseFrontmatter(content)
      games.push({
        nome: file.replace('.md', ''),
        ...fm,
        status,
      })
    }
  }

  return games
}

// ── Buscar user_id pelo email ─────────────────────
async function getUserId(email) {
  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) throw new Error(`Erro listando users: ${error.message}`)
  const user = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (!user) throw new Error(`Usuário ${email} não encontrado no Supabase Auth`)
  return user.id
}

// ── Upsert no catálogo + coleção ──────────────────
async function importGame(game, userId) {
  const slug = game.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  // 1. Buscar ou criar no catálogo games
  let { data: existing } = await supabase
    .from('games')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  let gameId
  if (existing) {
    gameId = existing.id
  } else {
    const { data: inserted, error } = await supabase
      .from('games')
      .insert({
        nome: game.nome,
        slug,
        capa: game.capa || null,
        generos: game.genero ? [game.genero] : [],
        plataformas: game.console ? [game.console] : [],
      })
      .select('id')
      .single()
    if (error) {
      console.warn(`  ⚠ Erro inserindo game "${game.nome}": ${error.message}`)
      return false
    }
    gameId = inserted.id
  }

  // 2. Montar user_games entry
  const tempo = parseTimeToHours(game.tempo)
  const hltb = parseTimeToHours(game.hltb)
  const nota = game.nota ? parseInt(game.nota) : null
  const anoZerado = game.ano_zerado ? parseInt(game.ano_zerado) : null

  const entry = {
    user_id: userId,
    game_id: gameId,
    status: game.status,
    console: game.console || null,
    nota: nota && nota >= 1 && nota <= 10 ? nota : null,
    tempo: tempo || 0,
    hltb: hltb || null,
    data_inicio: game.data_inicio || null,
    data_zerado: game.data_zerado || null,
    ano_zerado: game.status === 'zerado' ? anoZerado : null,
    ano_abandonado: game.status === 'abandonado' ? (anoZerado || new Date().getFullYear()) : null,
  }

  const { error: ugErr } = await supabase
    .from('user_games')
    .upsert(entry, { onConflict: 'user_id,game_id' })

  if (ugErr) {
    console.warn(`  ⚠ Erro inserindo user_game "${game.nome}": ${ugErr.message}`)
    return false
  }

  return true
}

// ── Main ──────────────────────────────────────────
async function main() {
  console.log('🎮 Importador Obsidian → Supabase')
  console.log('─'.repeat(50))

  // Buscar user_id
  console.log(`📧 Buscando usuário: ${USER_EMAIL}`)
  const userId = await getUserId(USER_EMAIL)
  console.log(`✅ User ID: ${userId}`)

  // Coletar jogos
  const games = collectGames()
  console.log(`📂 ${games.length} jogos encontrados no vault\n`)

  const stats = { zerado: 0, jogando: 0, abandonado: 0, pausado: 0, errors: 0 }

  for (const game of games) {
    const ok = await importGame(game, userId)
    if (ok) {
      stats[game.status]++
      console.log(`  ✅ ${game.nome} [${game.status}]`)
    } else {
      stats.errors++
    }
  }

  console.log('\n' + '─'.repeat(50))
  console.log('📊 Resultado:')
  console.log(`  Zerados:     ${stats.zerado}`)
  console.log(`  Jogando:     ${stats.jogando}`)
  console.log(`  Abandonados: ${stats.abandonado}`)
  console.log(`  Pausados:    ${stats.pausado}`)
  console.log(`  Erros:       ${stats.errors}`)
  console.log(`  Total:       ${games.length}`)
}

main().catch(err => {
  console.error('❌ Erro fatal:', err.message)
  process.exit(1)
})
