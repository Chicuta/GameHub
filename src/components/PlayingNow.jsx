import { parseTime, formatTime, getConsoleStyle, daysBetween, todayStr } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import { Flame, Calendar } from 'lucide-react'

function EtaBadge({ game }) {
  const t = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const hoje = todayStr()
  const dataInicio = game.data_inicio
  const dataFim = game.data_fim

  let text = ''
  let cls = 'eta-unknown'

  if (dataInicio) {
    const diasDecorrido = Math.max(1, daysBetween(dataInicio, hoje))

    if (dataFim) {
      const diasFaltando = daysBetween(hoje, dataFim)
      if (diasFaltando < 0) { text = 'prazo vencido'; cls = 'eta-unknown' }
      else if (diasFaltando === 0) { text = 'hoje!'; cls = 'eta-soon' }
      else if (diasFaltando <= 7) { text = `${diasFaltando}d`; cls = 'eta-soon' }
      else if (diasFaltando <= 30) { text = `${diasFaltando}d`; cls = 'eta-normal' }
      else { text = `${diasFaltando}d`; cls = 'eta-far' }
    } else if (h > 0 && t > 0) {
      const hPorDia = t / diasDecorrido
      const hRestantes = Math.max(h - t, 0)
      if (hRestantes === 0) { text = 'Quase lá!'; cls = 'eta-soon' }
      else {
        const diasRestantes = Math.ceil(hRestantes / hPorDia)
        if (diasRestantes <= 7) { text = `~${diasRestantes}d`; cls = 'eta-soon' }
        else if (diasRestantes <= 30) { text = `~${diasRestantes}d`; cls = 'eta-normal' }
        else { text = `~${diasRestantes}d`; cls = 'eta-far' }
      }
    } else if (h > 0) { text = 'sem ritmo'; cls = 'eta-unknown' }
    else { text = 'sem HLTB'; cls = 'eta-unknown' }
  } else {
    text = h > 0 ? 'sem data' : 'sem HLTB'
  }

  const styles = {
    'eta-soon': 'bg-accent-success/10 text-accent-success border-accent-success/25',
    'eta-normal': 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    'eta-far': 'bg-dash-muted/10 text-dash-muted border-dash-muted/20',
    'eta-unknown': 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  }

  return (
    <span className={`text-[0.58em] font-black whitespace-nowrap px-1.5 py-0.5 rounded border ${styles[cls]}`}>
      {text}
    </span>
  )
}

function GameCard({ game }) {
  const { openGame } = useGameDetail()
  const t = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const p = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0
  const s = getConsoleStyle(game.console)
  const onFire = p >= 70

  const diasDecorrido = game.data_inicio ? Math.max(1, daysBetween(game.data_inicio, todayStr())) : null

  return (
    <div
      onClick={() => openGame({ ...game, _status: 'jogando' })}
      className={`flex bg-dash-surface rounded-xl border overflow-hidden h-[100px] transition-all duration-300 hover:scale-[1.02] hover:border-accent-cyan cursor-pointer ${
        onFire ? 'border-orange-500/50 shadow-[0_0_12px_rgba(255,80,0,0.2)] hover:border-orange-500 hover:shadow-[0_0_22px_rgba(255,100,0,0.38)]' : 'border-white/5'
      }`}
    >
      <img src={game.capa} alt={game.nome} className="w-[70px] h-[100px] object-cover" />
      <div className="p-2.5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            <div className="font-black text-[0.85em] text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {onFire && <Flame className="animate-flame inline-block text-orange-500 drop-shadow-[0_0_4px_rgba(255,120,0,0.8)]" size={14} strokeWidth={2.5} />}{' '}
              {game.nome}
            </div>
            <ConsoleBadge console={game.console} />
            {diasDecorrido && (
              <div className="text-[0.58em] text-dash-muted mt-0.5 font-bold flex items-center gap-0.5"><Calendar size={10} strokeWidth={2.5} /> há {diasDecorrido}d</div>
            )}
          </div>
          <EtaBadge game={game} />
        </div>
        <div>
          <div className="flex justify-between text-[0.65em] font-extrabold mb-1">
            <span style={{ color: s.col }}>{p}% concluído</span>
            <span>{formatTime(t)}{h > 0 ? ` / ${h}h` : ''}</span>
          </div>
          <div className="h-1.5 bg-black/50 rounded overflow-hidden">
            <div className="h-full rounded" style={{ width: `${p}%`, background: s.col }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlayingNow({ jogando }) {
  const sorted = [...jogando].sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))

  return (
    <div className="mb-8">
      <SectionTitle icon={<Flame size={22} strokeWidth={2.5} className="text-orange-500" />}>JOGANDO AGORA</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sorted.map(g => <GameCard key={g.nome} game={g} />)}
      </div>
    </div>
  )
}
