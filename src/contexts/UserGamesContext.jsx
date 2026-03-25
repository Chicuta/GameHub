import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const UserGamesContext = createContext({})

/*  Transforma rows do Supabase no shape que os componentes esperam. */
function rowsToLegacy(rows) {
  const jogando = []
  const zerados = []
  const abandonados = []
  const backlog = []
  const pausados = []

  for (const r of rows) {
    const g = r.games // join
    const base = {
      _id: r.id,
      _gameId: r.game_id,
      nome: g.nome,
      console: r.console || g.plataformas?.[0] || '',
      capa: g.capa,
      tempo: Number(r.tempo) || 0,
      genero: g.generos?.[0] || '',
      nota: r.nota,
      hltb: Number(r.hltb) || null,
    }

    switch (r.status) {
      case 'jogando':
        jogando.push({
          ...base,
          data_inicio: r.data_inicio,
          data_fim: r.data_fim,
        })
        break
      case 'zerado':
        zerados.push({
          ...base,
          ano_zerado: r.ano_zerado || (r.data_zerado ? new Date(r.data_zerado).getFullYear() : null),
          data_zerado: r.data_zerado,
        })
        break
      case 'jogado':
        zerados.push({
          ...base,
          _isJogado: true,
          ano_zerado: r.ano_zerado || (r.data_zerado ? new Date(r.data_zerado).getFullYear() : null),
          data_zerado: r.data_zerado,
        })
        break
      case 'abandonado':
        abandonados.push({
          ...base,
          ano_abandonado: r.ano_abandonado,
        })
        break
      case 'pausado':
        pausados.push({
          ...base,
          data_inicio: r.data_inicio,
        })
        break
      case 'backlog':
        backlog.push(base)
        break
    }
  }

  return { jogando, zerados, abandonados, backlog, pausados }
}

export function UserGamesProvider({ children }) {
  const { user } = useAuth()
  const [games, setGames] = useState({ jogando: [], zerados: [], abandonados: [], backlog: [], pausados: [] })
  const [loading, setLoading] = useState(false)

  const userId = user?.id

  const load = useCallback(async () => {
    if (!supabase || !userId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('user_games')
      .select('*, games(*)')
      .eq('user_id', userId)

    if (!error && data) setGames(rowsToLegacy(data))
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  async function updateGame(userGameId, fields) {
    if (!supabase) return
    const { error } = await supabase.from('user_games').update(fields).eq('id', userGameId)
    if (!error) await load()
    return error
  }

  async function removeGame(userGameId) {
    if (!supabase) return
    const { error } = await supabase.from('user_games').delete().eq('id', userGameId)
    if (!error) await load()
    return error
  }

  return (
    <UserGamesContext.Provider value={{ games, loading, reload: load, updateGame, removeGame }}>
      {children}
    </UserGamesContext.Provider>
  )
}

export const useUserGames = () => useContext(UserGamesContext)
