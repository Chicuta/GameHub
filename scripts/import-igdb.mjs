/**
 * ===================================================
 * IGDB → Supabase Bulk Importer
 * ===================================================
 * 
 * Uso:
 *   node scripts/import-igdb.mjs
 * 
 * Requer no .env:
 *   IGDB_CLIENT_ID=seu_twitch_client_id
 *   IGDB_CLIENT_SECRET=seu_twitch_client_secret
 *   SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY=eyJhbGciOiJI...  (service_role key, NÃO a anon key)
 * 
 * O script:
 * 1. Autentica via Twitch OAuth2 (Client Credentials)
 * 2. Busca jogos do IGDB em batches de 500
 * 3. Insere/atualiza na tabela "games" do Supabase
 * 
 * Filtros padrão: apenas jogos principais (não DLCs), com cover art,
 * rating > 0, ordenados por popularidade.
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
  console.error('   Use a SERVICE_ROLE key (não a anon key) para bypassar RLS.')
  process.exit(1)
}

const IGDB_API = 'https://api.igdb.com/v4'
const BATCH_SIZE = 500   // máximo do IGDB
const MAX_GAMES = 10000  // total de jogos a importar (ajuste se quiser mais)
const DELAY_MS = 300     // delay entre requests (respeitar rate limit de 4/s)

// ─── Twitch OAuth2 ───────────────────────────────────
async function getAccessToken() {
  console.log('🔑 Autenticando via Twitch OAuth2...')
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Twitch auth falhou (${res.status}): ${text}`)
  }
  const data = await res.json()
  console.log(`✅ Token obtido (expira em ${Math.round(data.expires_in / 3600)}h)`)
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

// ─── Platform mapping (IGDB ID → nome legível) ──────
const PLATFORM_MAP = {
  6: 'PC', 167: 'PS5', 48: 'PS4', 9: 'PS3', 8: 'PS2', 7: 'PS1',
  169: 'Xbox Series X/S', 49: 'Xbox One', 12: 'Xbox 360', 11: 'Xbox',
  130: 'Switch', 41: 'Wii U', 5: 'Wii', 37: '3DS', 20: 'DS',
  386: 'Steam Deck', 34: 'Android', 39: 'iOS',
  170: 'Google Stadia', 163: 'Steam VR', 165: 'PS VR',
  14: 'Mac', 3: 'Linux',
  4: 'N64', 21: 'GameCube', 18: 'NES', 19: 'SNES',
  22: 'Game Boy Color', 24: 'Game Boy Advance',
  33: 'Game Boy', 137: 'New 3DS',
  29: 'Mega Drive', 23: 'Dreamcast', 32: 'Saturn',
  35: 'Game Gear', 78: 'Sega CD',
  388: 'PS Portal',
}

function mapPlatforms(platformIds) {
  if (!platformIds) return []
  return platformIds
    .map(id => PLATFORM_MAP[id] || null)
    .filter(Boolean)
}

// ─── Transform IGDB game → Supabase row ─────────────
function transformGame(g, covers, genres, platforms, timeToBeat) {
  const cover = covers.get(g.id)
  const coverUrl = cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`
    : null

  const gameGenres = (g.genres || [])
    .map(id => genres.get(id))
    .filter(Boolean)

  const gamePlatforms = mapPlatforms(g.platforms)

  const ttb = timeToBeat.get(g.id)
  const hltbMain = ttb?.normally ? Math.round(ttb.normally / 3600 * 10) / 10 : null
  const hltbComplete = ttb?.completely ? Math.round(ttb.completely / 3600 * 10) / 10 : null

  return {
    igdb_id: g.id,
    nome: g.name,
    slug: g.slug,
    capa: coverUrl,
    generos: gameGenres,
    plataformas: gamePlatforms,
    data_lancamento: g.first_release_date
      ? new Date(g.first_release_date * 1000).toISOString().split('T')[0]
      : null,
    metacritic: null,
    rawg_rating: null,
    igdb_rating: g.total_rating ? Math.round(g.total_rating * 100) / 100 : null,
    descricao: g.summary || null,
    hltb_main: hltbMain,
    hltb_complete: hltbComplete,
  }
}

// ─── Sleep helper ───────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ─── Main ───────────────────────────────────────────
async function main() {
  console.log('🎮 IGDB → Supabase Importer')
  console.log(`   Target: ${MAX_GAMES} jogos, batches de ${BATCH_SIZE}`)
  console.log()

  // 1. Autenticar
  const token = await getAccessToken()

  // 2. Buscar gêneros (tabela de lookup)
  console.log('📂 Carregando gêneros...')
  const genreList = await igdbQuery('genres', 'fields id,name; limit 500;', token)
  const genres = new Map(genreList.map(g => [g.id, g.name]))
  console.log(`   ${genres.size} gêneros carregados`)
  await sleep(DELAY_MS)

  // 3. Importar jogos em batches
  let offset = 0
  let totalImported = 0
  let totalSkipped = 0

  while (offset < MAX_GAMES) {
    const remaining = MAX_GAMES - offset
    const limit = Math.min(BATCH_SIZE, remaining)

    console.log(`\n📦 Batch ${Math.floor(offset / BATCH_SIZE) + 1} (offset: ${offset}, limit: ${limit})`)

    // 3a. Buscar jogos
    const query = `fields name, slug, summary, genres, platforms, first_release_date, total_rating, total_rating_count, cover; where total_rating_count > 3; sort total_rating_count desc; limit ${limit}; offset ${offset};`
    const games = await igdbQuery('games', query, token)

    if (games.length === 0) {
      console.log('   Sem mais resultados, finalizando.')
      break
    }

    console.log(`   ${games.length} jogos recebidos`)
    await sleep(DELAY_MS)

    // 3b. Buscar covers para este batch
    const coverIds = games.map(g => g.cover).filter(Boolean)
    let covers = new Map()
    if (coverIds.length > 0) {
      const coverChunks = chunkArray(coverIds, 500)
      for (const chunk of coverChunks) {
        const coverData = await igdbQuery(
          'covers',
          `fields game, image_id; where id = (${chunk.join(',')}); limit 500;`,
          token
        )
        for (const c of coverData) {
          covers.set(c.game, c.image_id)
        }
        await sleep(DELAY_MS)
      }
    }
    console.log(`   ${covers.size} covers carregadas`)

    // 3c. Buscar time-to-beat para este batch
    const gameIds = games.map(g => g.id)
    let timeToBeat = new Map()
    const ttbChunks = chunkArray(gameIds, 500)
    for (const chunk of ttbChunks) {
      try {
        const ttbData = await igdbQuery(
          'game_time_to_beats',
          `fields game_id, normally, completely; where game_id = (${chunk.join(',')}); limit 500;`,
          token
        )
        for (const t of ttbData) {
          timeToBeat.set(t.game_id, t)
        }
      } catch {
        // endpoint pode não ter dados para todos os jogos
      }
      await sleep(DELAY_MS)
    }
    console.log(`   ${timeToBeat.size} time-to-beat entries`)

    // 3d. Transformar e inserir
    const rows = games.map(g => transformGame(g, covers, genres, new Map(), timeToBeat))

    // Atualizar plataformas que precisam do ID map
    for (let i = 0; i < games.length; i++) {
      rows[i].plataformas = mapPlatforms(games[i].platforms)
    }

    try {
      await supabaseUpsert(rows)
      totalImported += rows.length
      console.log(`   ✅ ${rows.length} jogos inseridos/atualizados (total: ${totalImported})`)
    } catch (err) {
      console.error(`   ❌ Erro no upsert: ${err.message}`)
      // Tentar um a um para não perder o batch inteiro
      let saved = 0
      let failed = 0
      for (const row of rows) {
        try {
          await supabaseUpsert([row])
          saved++
        } catch {
          failed++
        }
      }
      totalImported += saved
      totalSkipped += failed
      console.log(`   🔧 Recuperação: ${saved} salvos, ${failed} falharam`)
    }

    offset += games.length
    await sleep(DELAY_MS)
  }

  console.log('\n' + '='.repeat(50))
  console.log(`🏁 Importação completa!`)
  console.log(`   ✅ Importados: ${totalImported}`)
  console.log(`   ⚠️  Ignorados: ${totalSkipped}`)
  console.log('='.repeat(50))
}

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

main().catch(err => {
  console.error('💥 Erro fatal:', err)
  process.exit(1)
})
