import { parseTime, formatTime, getConsoleStyle } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import { Pause } from 'lucide-react'

function PausedCard({ game }) {
  const { openGame } = useGameDetail()
  const t = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const p = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0
  const s = getConsoleStyle(game.console)

  return (
    <div onClick={() => openGame({ ...game, _status: 'pausado' })} className="flex bg-dash-surface rounded-xl border border-white/5 overflow-hidden h-[100px] transition-all duration-300 hover:scale-[1.02] hover:border-accent-purple opacity-70 hover:opacity-100 cursor-pointer">
      {game.capa ? (
        <img src={game.capa} alt={game.nome} className="w-[70px] h-[100px] object-cover grayscale-[50%]" />
      ) : (
        <div className="w-[70px] h-[100px] bg-white/5 flex items-center justify-center text-dash-muted text-lg">⏸</div>
      )}
      <div className="p-2.5 flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="font-black text-[0.85em] text-white whitespace-nowrap overflow-hidden text-ellipsis">
            <Pause className="inline-block text-accent-purple" size={13} strokeWidth={2.5} /> {game.nome}
          </div>
          <ConsoleBadge console={game.console} />
        </div>
        <div>
          <div className="flex justify-between text-[0.65em] font-extrabold mb-1">
            <span style={{ color: s.col }}>{p}% concluído</span>
            <span>{formatTime(t)}{h > 0 ? ` / ${h}h` : ''}</span>
          </div>
          <div className="h-1.5 bg-black/50 rounded overflow-hidden">
            <div className="h-full rounded opacity-50" style={{ width: `${p}%`, background: s.col }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PausedGames({ pausados }) {
  if (!pausados || pausados.length === 0) return null

  const sorted = [...pausados].sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))

  return (
    <div className="mb-8">
      <SectionTitle icon={<Pause size={22} strokeWidth={2.5} className="text-accent-purple" />}>PAUSADOS</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sorted.map(g => <PausedCard key={g.nome} game={g} />)}
      </div>
    </div>
  )
}
