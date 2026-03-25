import { useState, useEffect } from 'react'
import { fetchTrendingGames } from '../lib/gamesApi'
import { TrendingUp, Star } from 'lucide-react'

function getRating(game) {
  if (game.metacritic) return { value: game.metacritic, max: 100 }
  if (game.igdb_rating) return { value: Math.round(game.igdb_rating), max: 100 }
  if (game.rawg_rating) return { value: Number(game.rawg_rating).toFixed(1), max: 5 }
  return null
}

function GameCard({ game }) {
  const coverUrl = game.capa || null
  const rating = getRating(game)

  return (
    <div className="group relative bg-dash-surface/60 border border-white/5 rounded-xl overflow-hidden hover:border-white/15 transition-all">
      <div className="aspect-[3/4] bg-black/40 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={game.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dash-muted text-xs">Sem capa</div>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1">{game.nome}</h4>
        <div className="flex items-center gap-2">
          {rating && (
            <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
              rating.value >= 85 ? 'bg-green-500/20 text-green-400' :
              rating.value >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              <Star size={10} className="inline-block align-[-0.1em] mr-0.5" fill="currentColor" />
              {rating.value}
            </span>
          )}
        </div>
        {game.generos?.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {game.generos.slice(0, 2).map(g => (
              <span key={g} className="text-[0.6rem] text-dash-muted bg-white/5 rounded px-1.5 py-0.5">{g}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TrendingGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrendingGames(12).then(data => {
      setGames(data)
      setLoading(false)
    })
  }, [])

  if (!loading && games.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
          <TrendingUp size={20} className="text-accent-cyan" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="font-heading font-black uppercase tracking-wider text-lg text-white">Em Alta</h2>
          <p className="text-dash-muted text-xs">Jogos mais bem avaliados dos últimos meses</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}
