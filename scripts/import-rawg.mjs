/**
 * ===================================================
 * RAWG.io → Supabase Bulk Importer
 * ===================================================
 *
 * Uso:
 *   node scripts/import-rawg.mjs
 *
 * Requer no .env:
 *   VITE_RAWG_API_KEY=sua_rawg_api_key
 *   SUPABASE_URL ou VITE_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY=eyJhbGciOiJI...  (service_role key)
 *
 * O script:
 * 1. Carrega rawg_ids já existentes no banco
 * 2. Busca jogos da RAWG em páginas de 40
 * 3. Insere somente os jogos que ainda NÃO existem (por rawg_id)
 * ===================================================
 */

import { config } from 'dotenv'
config()

// ─── Config ──────────────────────────────────────────
const RAWG_API_KEY = process.env.VITE_RAWG_API_KEY
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!RAWG_API_KEY) {
  console.error('❌ Falta VITE_RAWG_API_KEY no .env')
  process.exit(1)
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_KEY no .env')
  console.error('   Use a SERVICE_ROLE key (não a anon key) para bypassar RLS.')
  process.exit(1)
}

const RAWG_API = 'https://api.rawg.io/api'
const PAGE_SIZE = 40          // máximo da RAWG
const MAX_PAGES = 250         // 250 pages × 40 = 10.000 jogos
const DELAY_MS = 250          // respeitar rate-limit

// ─── Helpers ────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ─── Fetch existing rawg_ids from Supabase ──────────
async function fetchExistingRawgIds() {
  console.log('📂 Carregando rawg_ids existentes no banco...')
  const ids = new Set()
  let offset = 0
  const batchSize = 1000

  while (true) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/games?select=rawg_id&rawg_id=not.is.null&offset=${offset}&limit=${batchSize}`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    )
    if (!res.ok) throw new Error(`Supabase fetch falhou (${res.status})`)
    const data = await res.json()
    if (data.length === 0) break
    data.forEach(row => ids.add(row.rawg_id))
    offset += batchSize
  }

  console.log(`   ${ids.size} jogos já existem no banco`)
  return ids
}

// ─── RAWG API fetch ─────────────────────────────────
async function fetchRawgPage(page, ordering = '-rating') {
  const url = `${RAWG_API}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${PAGE_SIZE}&ordering=${ordering}&metacritic=1,100`
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`RAWG falhou (${res.status}): ${text}`)
  }
  return res.json()
}

// ─── Transform RAWG game → Supabase row ─────────────
function transformGame(g) {
  const generos = (g.genres || []).map(genre => genre.name)
  const plataformas = (g.platforms || []).map(p => p.platform?.name).filter(Boolean)

  return {
    rawg_id: g.id,
    nome: g.name,
    slug: g.slug,
    capa: g.background_image || null,
    generos: generos.length > 0 ? generos : null,
    plataformas: plataformas.length > 0 ? plataformas : null,
    data_lancamento: g.released || null,
    metacritic: g.metacritic || null,
    rawg_rating: g.rating || null,
  }
}

// ─── Supabase upsert ────────────────────────────────
async function supabaseUpsert(rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/games`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase upsert falhou (${res.status}): ${text}`)
  }
  return res.status
}

// ─── Main ───────────────────────────────────────────
async function main() {
  console.log('🎮 RAWG.io → Supabase Importer')
  console.log(`   Target: até ${MAX_PAGES * PAGE_SIZE} jogos, páginas de ${PAGE_SIZE}`)
  console.log()

  // 1. Carregar IDs existentes
  const existingIds = await fetchExistingRawgIds()

  // 2. Iterar páginas da RAWG
  let totalImported = 0
  let totalSkipped = 0
  let page = 1

  while (page <= MAX_PAGES) {
    console.log(`\n📦 Página ${page}/${MAX_PAGES}`)

    let data
    try {
      data = await fetchRawgPage(page)
    } catch (err) {
      console.error(`   ❌ Erro ao buscar página: ${err.message}`)
      break
    }

    const results = data.results || []
    if (results.length === 0) {
      console.log('   Sem mais resultados, finalizando.')
      break
    }

    // Filtrar jogos que já existem
    const newGames = results.filter(g => !existingIds.has(g.id))
    const skipped = results.length - newGames.length
    totalSkipped += skipped

    if (newGames.length === 0) {
      console.log(`   ⏭ ${skipped} jogos já existiam, pulando.`)
      page++
      await sleep(DELAY_MS)
      continue
    }

    console.log(`   ${newGames.length} novos, ${skipped} já existiam`)

    // Transformar e inserir
    const rows = newGames.map(transformGame)

    try {
      await supabaseUpsert(rows)
      totalImported += rows.length
      rows.forEach(r => existingIds.add(r.rawg_id)) // atualizar set local
      console.log(`   ✅ ${rows.length} jogos inseridos (total: ${totalImported})`)
    } catch (err) {
      console.error(`   ❌ Erro no upsert: ${err.message}`)
      // Tentar um a um
      let saved = 0
      let failed = 0
      for (const row of rows) {
        try {
          await supabaseUpsert([row])
          existingIds.add(row.rawg_id)
          saved++
        } catch {
          failed++
        }
      }
      totalImported += saved
      console.log(`   🔧 Recuperação: ${saved} salvos, ${failed} falharam`)
    }

    // Checar se tem próxima página
    if (!data.next) {
      console.log('   Última página da RAWG.')
      break
    }

    page++
    await sleep(DELAY_MS)
  }

  console.log('\n' + '='.repeat(50))
  console.log(`🏁 Importação RAWG completa!`)
  console.log(`   ✅ Novos importados: ${totalImported}`)
  console.log(`   ⏭  Já existiam: ${totalSkipped}`)
  console.log('='.repeat(50))
}

main().catch(err => {
  console.error('💥 Erro fatal:', err)
  process.exit(1)
})
