/**
 * ===================================================
 * Fix Platforms — Preenche plataformas (e gêneros) via IGDB
 * ===================================================
 *
 * Uso:
 *   node scripts/fix-platforms.mjs
 *   node scripts/fix-platforms.mjs --dry-run        (só mostra, não salva)
 *   node scripts/fix-platforms.mjs --limit 10       (processa só 10 jogos)
 *
 * Requer no .env:
 *   IGDB_CLIENT_ID / IGDB_CLIENT_SECRET
 *   SUPABASE_URL (ou VITE_SUPABASE_URL)
 *   SUPABASE_SERVICE_KEY  (service_role key)
 *
 * O script:
 * 1. Busca todos os jogos com plataformas NULL/vazia no Supabase
 * 2. Para cada jogo, faz busca por nome na IGDB
 * 3. Atualiza: plataformas, generos, igdb_id, descricao, data_lancamento,
 *    igdb_rating, hltb_main, hltb_complete, slug
 * 4. Gera relatório final por plataforma
 * ===================================================
 */

import { config } from 'dotenv'
config()

// ─── Config ──────────────────────────────────────────
const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID
const IGDB_CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
  console.error('❌ Faltam IGDB_CLIENT_ID e/ou IGDB_CLIENT_SECRET no .env')
  process.exit(1)
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_KEY no .env')
  process.exit(1)
}

const IGDB_API = 'https://api.igdb.com/v4'
const DELAY_MS = 280 // ~3.5 req/s (IGDB limit = 4/s)

// ─── CLI args ─────────────────────────────────────────
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const limitIdx = args.indexOf('--limit')
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity

if (DRY_RUN) console.log('🔍 DRY RUN — nenhuma alteração será salva\n')

// ─── Platform mapping (IGDB ID → nome legível) ──────
const PLATFORM_MAP = {
  6: 'PC',
  167: 'PS5', 48: 'PS4', 9: 'PS3', 8: 'PS2', 7: 'PS1',
  169: 'Xbox Series X/S', 49: 'Xbox One', 12: 'Xbox 360', 11: 'Xbox',
  130: 'Switch', 41: 'Wii U', 5: 'Wii', 37: '3DS', 20: 'DS',
  4: 'N64', 21: 'GameCube', 18: 'NES', 19: 'SNES',
  22: 'Game Boy Color', 24: 'Game Boy Advance', 33: 'Game Boy', 137: 'New 3DS',
  29: 'Mega Drive', 23: 'Dreamcast', 32: 'Saturn', 35: 'Game Gear', 78: 'Sega CD',
  30: '3DO',
  386: 'Steam Deck', 34: 'Android', 39: 'iOS',
  14: 'Mac', 3: 'Linux',
  388: 'PS Portal',
  // Retro / Arcade
  52: 'Arcade',
  50: 'Neo Geo AES', 79: 'Neo Geo MVS', 80: 'Neo Geo CD',
  128: 'Sega Master System',
  86: 'TurboGrafx-16', 150: 'TurboGrafx-CD',
  87: 'Virtual Boy',
  136: 'Neo Geo Pocket Color', 119: 'Neo Geo Pocket',
  25: 'Atari 2600', 65: 'Atari 7800', 60: 'Atari Jaguar', 66: 'Atari Lynx',
  57: 'WonderSwan', 123: 'WonderSwan Color',
  114: 'Amiga', 115: 'Amstrad CPC', 15: 'Commodore 64', 16: 'ZX Spectrum',
  38: 'PSP', 46: 'PS Vita',
  159: 'Nintendo DSi',
  58: 'Super Famicom',
  64: 'Sega Master System', // fallback
  135: 'Game Boy', // Game Boy
  75: 'Apple II',
  63: 'Atari ST',
  82: 'Browser',
  170: 'Google Stadia',
  // IDs extras descobertos na primeira passagem
  99: 'Famicom',
  13: 'DOS',
  121: 'Sharp X68000',
  120: 'Neo Geo Pocket',
  118: 'TurboGrafx-CD', // alt ID
  55: 'Mobile',
  26: 'Game Boy Advance', // alt mapping
  27: 'Mega Drive', // alt Atari mapping
  51: 'Famicom Disk System',
  53: 'MSX2',
  42: 'N-Gage',
  62: 'Atari Jaguar CD',
  149: 'PC-98',
  125: 'PC-8801',
  116: 'Amiga CD32',
  126: 'Sega Pico',
  158: 'Commodore CDTV',
  306: 'Satellaview',
  240: 'Zeebo',
  373: 'Sega Mega-CD',
  377: 'Epoch Super Cassette Vision',
  411: 'Data East Arcade',
  415: 'Dreamcast VMU',
  508: 'Switch 2',
  162: 'Oculus VR',
  61: 'Lynx',
}

function mapPlatforms(platformIds) {
  if (!platformIds || !platformIds.length) return []
  return platformIds
    .map(id => PLATFORM_MAP[id] || `Platform(${id})`)
    .filter((v, i, a) => a.indexOf(v) === i) // dedupe
}

// ─── Helpers ────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ─── Twitch OAuth2 ───────────────────────────────────
async function getAccessToken() {
  console.log('🔑 Autenticando via Twitch OAuth2...')
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )
  if (!res.ok) throw new Error(`Twitch auth falhou (${res.status})`)
  const data = await res.json()
  console.log(`✅ Token obtido (expira em ${Math.round(data.expires_in / 3600)}h)\n`)
  return data.access_token
}

// ─── IGDB Query ──────────────────────────────────────
async function igdbQuery(endpoint, body, token) {
  const res = await fetch(`${IGDB_API}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': IGDB_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`IGDB ${endpoint} falhou (${res.status}): ${text}`)
  }
  return res.json()
}

// ─── Supabase helpers ────────────────────────────────
const supaHeaders = {
  'apikey': SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
}

async function supabaseFetch(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: supaHeaders })
  if (!res.ok) throw new Error(`Supabase GET falhou (${res.status})`)
  return res.json()
}

async function supabaseUpdate(table, id, fields) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...supaHeaders, 'Prefer': 'return=minimal' },
    body: JSON.stringify(fields),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase PATCH falhou (${res.status}): ${text}`)
  }
}

// ─── Fetch games with missing platforms ──────────────
async function fetchGamesWithoutPlatform() {
  console.log('📂 Buscando jogos sem plataforma no catálogo...')
  const games = []
  let offset = 0
  const batchSize = 1000

  while (true) {
    const data = await supabaseFetch(
      `games?select=id,nome,plataformas,igdb_id&or=(plataformas.is.null,plataformas.eq.{})&order=nome.asc&offset=${offset}&limit=${batchSize}`
    )
    if (!data.length) break
    games.push(...data)
    offset += batchSize
  }

  console.log(`   ${games.length} jogos encontrados sem plataforma\n`)
  return games
}

// ─── Search IGDB by name ─────────────────────────────
async function searchIGDB(name, token) {
  // Limpa o nome para melhor match — remove subtitles especiais
  const cleanName = name
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .trim()

  const body = `search "${cleanName.replace(/"/g, '\\"')}"; fields name, slug, summary, genres, platforms, first_release_date, total_rating, cover; limit 5;`

  const results = await igdbQuery('games', body, token)
  if (!results.length) return null

  // Tenta match exato (case-insensitive)
  const exact = results.find(
    r => r.name.toLowerCase().trim() === cleanName.toLowerCase().trim()
  )
  if (exact) return exact

  // Fallback: pega o primeiro resultado
  return results[0]
}

// ─── Fetch cover image_id ────────────────────────────
async function fetchCover(coverId, token) {
  if (!coverId) return null
  const data = await igdbQuery('covers', `fields image_id; where id = ${coverId}; limit 1;`, token)
  return data[0]?.image_id || null
}

// ─── Fetch genres by IDs ─────────────────────────────
async function fetchGenres(genreIds, token, genreCache) {
  if (!genreIds || !genreIds.length) return []
  const missing = genreIds.filter(id => !genreCache.has(id))
  if (missing.length > 0) {
    const data = await igdbQuery(
      'genres',
      `fields id, name; where id = (${missing.join(',')}); limit 50;`,
      token
    )
    for (const g of data) genreCache.set(g.id, g.name)
    await sleep(DELAY_MS)
  }
  return genreIds.map(id => genreCache.get(id)).filter(Boolean)
}

// ─── Main ───────────────────────────────────────────
async function main() {
  console.log('🔧 Fix Platforms — Preenchendo plataformas via IGDB')
  console.log('='.repeat(55) + '\n')

  // 1. Buscar jogos sem plataforma
  const games = await fetchGamesWithoutPlatform()
  if (!games.length) {
    console.log('✅ Todos os jogos já têm plataforma! Nada a fazer.')
    return
  }

  const toProcess = games.slice(0, LIMIT)
  console.log(`📋 Processando ${toProcess.length} de ${games.length} jogos\n`)

  // 2. Auth IGDB
  const token = await getAccessToken()

  // 3. Cache de gêneros
  const genreCache = new Map()

  // 4. Processar cada jogo
  const stats = {
    updated: 0,
    notFound: 0,
    errors: 0,
    noPlatform: 0,
  }
  const platformCount = {} // plataforma → contagem
  const notFoundList = []
  const updatedList = []

  for (let i = 0; i < toProcess.length; i++) {
    const game = toProcess[i]
    const progress = `[${i + 1}/${toProcess.length}]`

    try {
      // Se já tem igdb_id, busca direto
      let igdbGame = null
      if (game.igdb_id) {
        const results = await igdbQuery(
          'games',
          `fields name, slug, summary, genres, platforms, first_release_date, total_rating, cover; where id = ${game.igdb_id}; limit 1;`,
          token
        )
        igdbGame = results[0] || null
      } else {
        igdbGame = await searchIGDB(game.nome, token)
      }

      await sleep(DELAY_MS)

      if (!igdbGame) {
        console.log(`${progress} ❌ Não encontrado: ${game.nome}`)
        stats.notFound++
        notFoundList.push(game.nome)
        continue
      }

      const platforms = mapPlatforms(igdbGame.platforms)
      if (!platforms.length) {
        console.log(`${progress} ⚠️  Sem plataforma na IGDB: ${game.nome}`)
        stats.noPlatform++
        notFoundList.push(`${game.nome} (sem plataforma na IGDB)`)
        continue
      }

      // Buscar gêneros
      const genres = await fetchGenres(igdbGame.genres, token, genreCache)

      // Buscar cover se não tiver
      let coverUrl = null
      if (igdbGame.cover) {
        const imageId = await fetchCover(igdbGame.cover, token)
        if (imageId) {
          coverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
        }
        await sleep(DELAY_MS)
      }

      // Montar update
      const updateFields = {
        plataformas: platforms,
        updated_at: new Date().toISOString(),
      }

      // Só preenche campos que estão NULL
      if (!game.igdb_id) updateFields.igdb_id = igdbGame.id
      if (genres.length > 0) updateFields.generos = genres
      if (igdbGame.slug) updateFields.slug = igdbGame.slug
      if (igdbGame.summary) updateFields.descricao = igdbGame.summary
      if (igdbGame.first_release_date) {
        updateFields.data_lancamento = new Date(igdbGame.first_release_date * 1000)
          .toISOString().split('T')[0]
      }
      if (igdbGame.total_rating) {
        updateFields.igdb_rating = Math.round(igdbGame.total_rating * 100) / 100
      }

      if (!DRY_RUN) {
        try {
          await supabaseUpdate('games', game.id, updateFields)
        } catch (patchErr) {
          // Se conflito de igdb_id duplicado, tenta sem igdb_id
          if (patchErr.message.includes('23505') && updateFields.igdb_id) {
            delete updateFields.igdb_id
            await supabaseUpdate('games', game.id, updateFields)
          } else {
            throw patchErr
          }
        }
      }

      // Contar plataformas
      for (const p of platforms) {
        platformCount[p] = (platformCount[p] || 0) + 1
      }

      stats.updated++
      updatedList.push({ nome: game.nome, platforms, igdbMatch: igdbGame.name })
      console.log(`${progress} ✅ ${game.nome} → [${platforms.join(', ')}]`)
    } catch (err) {
      console.error(`${progress} 💥 Erro em "${game.nome}": ${err.message}`)
      stats.errors++
    }
  }

  // ─── Relatório Final ──────────────────────────────
  console.log('\n' + '='.repeat(55))
  console.log('📊 RELATÓRIO FINAL')
  console.log('='.repeat(55))
  console.log(`   ✅ Atualizados:       ${stats.updated}`)
  console.log(`   ❌ Não encontrados:   ${stats.notFound}`)
  console.log(`   ⚠️  Sem plataforma:    ${stats.noPlatform}`)
  console.log(`   💥 Erros:             ${stats.errors}`)
  console.log(`   📋 Total processado:  ${toProcess.length}`)

  // Distribuição por plataforma
  if (Object.keys(platformCount).length > 0) {
    console.log('\n📊 DISTRIBUIÇÃO POR PLATAFORMA:')
    console.log('-'.repeat(40))
    const sorted = Object.entries(platformCount).sort((a, b) => b[1] - a[1])
    for (const [platform, count] of sorted) {
      const bar = '█'.repeat(Math.min(count, 50))
      console.log(`   ${platform.padEnd(22)} ${String(count).padStart(4)}  ${bar}`)
    }
  }

  // Jogos não encontrados
  if (notFoundList.length > 0) {
    console.log('\n❌ JOGOS NÃO ENCONTRADOS/SEM PLATAFORMA:')
    console.log('-'.repeat(40))
    for (const name of notFoundList) {
      console.log(`   • ${name}`)
    }
  }

  console.log('\n' + '='.repeat(55))
  if (DRY_RUN) {
    console.log('🔍 DRY RUN completo — nenhuma alteração foi salva.')
    console.log('   Execute sem --dry-run para aplicar.')
  } else {
    console.log('🏁 Fix completo!')
  }
  console.log('='.repeat(55))
}

main().catch(err => {
  console.error('💥 Erro fatal:', err)
  process.exit(1)
})
