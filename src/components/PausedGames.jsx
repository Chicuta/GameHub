import { useState } from 'react'
import { parseTime, formatTime, getConsoleStyle } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import HltbBar from './HltbBar'
import { Pause, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
        <HltbBar tempo={game.tempo} hltb={game.hltb} consoleColor={s.col} />
      </div>
    </div>
  )
}

export default function PausedGames({ pausados }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  if (!pausados || pausados.length === 0) return null

  const sorted = [...pausados].sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))

  return (
    <div className="mb-8">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between cursor-pointer mb-4 group">
        <SectionTitle icon={<Pause size={22} strokeWidth={2.5} className="text-accent-purple" />}>{t('paused.title')} <span className="text-dash-muted text-sm font-normal ml-1">({pausados.length})</span></SectionTitle>
        <ChevronDown size={20} className={`text-dash-muted transition-transform duration-300 group-hover:text-accent-purple ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sorted.map(g => <PausedCard key={g.nome} game={g} />)}
        </div>
      )}
    </div>
  )
}
