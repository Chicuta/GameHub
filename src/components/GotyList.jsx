import { useState, useEffect } from 'react'
import { fetchGotyByYear } from '../lib/gamesApi'
import { Trophy, Star, Crown } from 'lucide-react'

function getRating(game) {
  if (game.metacritic) return Math.round(game.metacritic)
  if (game.igdb_rating) return Math.round(game.igdb_rating)
  return null
}

function GotyCard({ game, rank }) {
  const coverUrl = game.capa || null
  const rating = getRating(game)

  return (
    <div className="flex items-center gap-3 bg-dash-surface/40 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-all">
      <div className="relative w-14 h-18 flex-shrink-0 rounded-lg overflow-hidden bg-black/40">
        {coverUrl ? (
          <img src={coverUrl} alt={game.nome} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dash-muted text-[0.5rem]">?</div>
        )}
        {rank === 0 && (
          <div className="absolute top-0.5 right-0.5">
            <Crown size={12} className="text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" fill="currentColor" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-bold leading-tight truncate">{game.nome}</h4>
        <div className="flex items-center gap-2 mt-1">
          {rating && (
            <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
              rating >= 85 ? 'bg-green-500/20 text-green-400' :
              rating >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              <Star size={10} className="inline-block align-[-0.1em] mr-0.5" fill="currentColor" />
              {rating}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GotyList() {
  const [gotyData, setGotyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGotyByYear(3).then(data => {
      setGotyData(data)
      setLoading(false)
    })
  }, [])

  if (!loading && gotyData.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
          <Trophy size={20} className="text-yellow-400" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="font-heading font-black uppercase tracking-wider text-lg text-white">GOTY</h2>
          <p className="text-dash-muted text-xs">Os melhores jogos dos últimos anos</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gotyData.map(({ year, games }) => (
            <div key={year}>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-heading font-black text-2xl bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {year}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="space-y-2">
                {games.map((game, i) => (
                  <GotyCard key={game.id} game={game} rank={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
