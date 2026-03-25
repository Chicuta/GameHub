import { supabase } from './supabase'

/**
 * Jogos em alta: lançamentos recentes com melhor rating
 */
export async function fetchTrendingGames(limit = 12) {
  if (!supabase) return []
  const currentYear = new Date().getFullYear()
  const { data, error } = await supabase
    .from('games')
    .select('id, nome, capa, generos, plataformas, metacritic, rawg_rating, igdb_rating, data_lancamento')
    .gte('data_lancamento', `${currentYear - 1}-01-01`)
    .not('capa', 'is', null)
    .order('igdb_rating', { ascending: false, nullsFirst: false })
    .limit(limit)
  if (error) { console.error('fetchTrendingGames:', error); return [] }
  return data || []
}

/**
 * GOTY: melhor jogo de cada ano (últimos N anos) por rating
 */
export async function fetchGotyByYear(years = 3) {
  if (!supabase) return []
  const currentYear = new Date().getFullYear()
  const results = []

  for (let y = currentYear; y > currentYear - years; y--) {
    const { data, error } = await supabase
      .from('games')
      .select('id, nome, capa, generos, plataformas, metacritic, rawg_rating, igdb_rating, data_lancamento')
      .gte('data_lancamento', `${y}-01-01`)
      .lte('data_lancamento', `${y}-12-31`)
      .not('capa', 'is', null)
      .order('igdb_rating', { ascending: false, nullsFirst: false })
      .limit(5)

    if (!error && data?.length) {
      results.push({ year: y, games: data })
    }
  }

  return results
}

/* ── Game Sessions ──────────────────────────────── */

export async function fetchSessions(userGameId) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('user_game_id', userGameId)
    .order('session_date', { ascending: false })
    .order('start_time', { ascending: false, nullsFirst: true })
  if (error) { console.error('fetchSessions:', error); return [] }
  return data || []
}

export async function createSession(session) {
  if (!supabase) return { error: 'No supabase' }
  const { data, error } = await supabase
    .from('game_sessions')
    .insert(session)
    .select()
    .single()
  if (error) console.error('createSession:', error)
  return { data, error }
}

export async function updateSession(sessionId, fields) {
  if (!supabase) return { error: 'No supabase' }
  const { error } = await supabase
    .from('game_sessions')
    .update(fields)
    .eq('id', sessionId)
  if (error) console.error('updateSession:', error)
  return { error }
}

export async function deleteSession(sessionId) {
  if (!supabase) return { error: 'No supabase' }
  const { error } = await supabase
    .from('game_sessions')
    .delete()
    .eq('id', sessionId)
  if (error) console.error('deleteSession:', error)
  return { error }
}
