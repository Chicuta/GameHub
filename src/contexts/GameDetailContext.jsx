import { createContext, useContext, useState, useCallback } from 'react'

const GameDetailContext = createContext({})

export function GameDetailProvider({ children }) {
  const [selectedGame, setSelectedGame] = useState(null)

  const openGame = useCallback((game) => setSelectedGame(game), [])
  const closeGame = useCallback(() => setSelectedGame(null), [])

  return (
    <GameDetailContext.Provider value={{ selectedGame, openGame, closeGame }}>
      {children}
    </GameDetailContext.Provider>
  )
}

export const useGameDetail = () => useContext(GameDetailContext)
