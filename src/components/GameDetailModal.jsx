import { useEffect, useState } from 'react'
import { useGameDetail } from '../contexts/GameDetailContext'
import { useUserGames } from '../contexts/UserGamesContext'
import { parseTime, formatTime, getConsoleStyle, daysBetween, todayStr, formatDateBR } from '../utils/helpers'
import ConsoleBadge from './ConsoleBadge'
import { X, Clock, Target, Calendar, Star, Flame, TrendingUp, Gamepad2, Plus, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

function StatPill({ icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-black/30 rounded-xl px-4 py-3 border border-white/5 min-w-[100px]">
      <div className="text-[0.65em] font-bold uppercase tracking-wider text-dash-muted flex items-center gap-1">
        {icon} {label}
      </div>
      <div className="text-base font-black" style={{ color: color || '#fff' }}>{value}</div>
    </div>
  )
}

function ProgressSection({ tempo, hltb, consoleStyle }) {
  const t = parseTime(tempo)
  const h = parseFloat(hltb) || 0
  const p = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0
  const restante = h > 0 ? Math.max(h - t, 0) : 0

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
      <div className="flex justify-between text-sm font-extrabold mb-2">
        <span style={{ color: consoleStyle.col }}>{p}% concluído</span>
        <span className="text-dash-muted">{formatTime(t)} / {h > 0 ? `${h}h` : '—'}</span>
      </div>
      <div className="h-3 bg-black/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${p}%`, background: `linear-gradient(90deg, ${consoleStyle.col}, ${consoleStyle.col}cc)` }}
        />
      </div>
      {h > 0 && (
        <div className="text-[0.7em] text-dash-muted mt-2 font-bold text-right">
          {restante > 0 ? `${formatTime(restante)} restantes` : '✅ Tempo estimado atingido!'}
        </div>
      )}
    </div>
  )
}

function EtaSection({ game }) {
  const t = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const dataInicio = game.data_inicio
  const hoje = todayStr()

  if (!dataInicio || h <= 0 || t <= 0) return null

  const diasDecorridos = Math.max(1, daysBetween(dataInicio, hoje))
  const hPorDia = t / diasDecorridos
  const restante = Math.max(h - t, 0)

  if (restante === 0) return null

  const diasRestantes = Math.ceil(restante / hPorDia)
  const dataEstimada = new Date()
  dataEstimada.setDate(dataEstimada.getDate() + diasRestantes)
  const dataEstimadaStr = dataEstimada.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
      <div className="text-[0.7em] font-black uppercase tracking-wider text-dash-muted mb-3 flex items-center gap-1.5">
        <TrendingUp size={14} strokeWidth={2.5} /> Previsão de Término
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-black text-accent-cyan">{formatTime(hPorDia)}</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">por dia</div>
        </div>
        <div>
          <div className="text-lg font-black text-accent-success">~{diasRestantes}d</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">restantes</div>
        </div>
        <div>
          <div className="text-lg font-black text-accent-gold">{dataEstimadaStr}</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">previsão</div>
        </div>
      </div>
    </div>
  )
}

const statusConfig = {
  jogando: { label: 'Jogando', color: '#00f5ff', icon: <Flame size={14} strokeWidth={2.5} /> },
  zerado: { label: 'Zerado', color: '#00ff9f', icon: <Star size={14} strokeWidth={2.5} /> },
  pausado: { label: 'Pausado', color: '#bc13fe', icon: <Clock size={14} strokeWidth={2.5} /> },
  abandonado: { label: 'Abandonado', color: '#ff0055', icon: <X size={14} strokeWidth={2.5} /> },
  backlog: { label: 'Backlog', color: '#94a3b8', icon: <Target size={14} strokeWidth={2.5} /> },
}

function SessionLogger({ game }) {
  const { updateGame, reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [open, setOpen] = useState(false)
  const [inicio, setInicio] = useState('')
  const [fim, setFim] = useState('')
  const [saving, setSaving] = useState(false)

  const duracao = (() => {
    if (!inicio || !fim) return null
    const [h1, m1] = inicio.split(':').map(Number)
    const [h2, m2] = fim.split(':').map(Number)
    const totalMin = (h2 * 60 + m2) - (h1 * 60 + m1)
    if (totalMin <= 0) return null
    return totalMin / 60
  })()

  if (!game._id) return null

  async function handleSave() {
    if (!duracao || duracao <= 0) return
    setSaving(true)
    const currentTempo = parseTime(game.tempo)
    const newTempo = Math.round((currentTempo + duracao) * 100) / 100
    const err = await updateGame(game._id, { tempo: newTempo })
    if (!err) {
      toast.success(`+${formatTime(duracao)} registrado!`)
      await reload()
      openGame({ ...game, tempo: newTempo })
      setInicio('')
      setFim('')
      setOpen(false)
    } else {
      toast.error('Erro ao salvar sessão')
    }
    setSaving(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent-cyan/30 text-accent-cyan font-heading font-black uppercase tracking-wider text-xs hover:bg-accent-cyan/5 hover:border-accent-cyan/50 transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Timer size={14} strokeWidth={2.5} /> Registrar Sessão
      </button>
    )
  }

  const inputCls = 'bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-accent-cyan transition-colors w-full'

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-accent-cyan/20">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[0.7em] font-black uppercase tracking-wider text-accent-cyan flex items-center gap-1.5">
          <Timer size={14} strokeWidth={2.5} /> Nova Sessão
        </div>
        <button onClick={() => setOpen(false)} className="text-dash-muted hover:text-white cursor-pointer">
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
        <div>
          <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">Início</label>
          <input type="time" value={inicio} onChange={e => setInicio(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">Fim</label>
          <input type="time" value={fim} onChange={e => setFim(e.target.value)} className={inputCls} />
        </div>
        <button
          onClick={handleSave}
          disabled={!duracao || duracao <= 0 || saving}
          className="h-[38px] px-4 rounded-lg bg-accent-cyan/15 text-accent-cyan font-black text-xs uppercase tracking-wider border border-accent-cyan/30 hover:bg-accent-cyan/25 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {saving ? '...' : <Plus size={16} strokeWidth={2.5} />}
        </button>
      </div>
      {duracao && duracao > 0 && (
        <div className="mt-2 text-[0.7em] font-bold text-accent-success text-center">
          +{formatTime(duracao)} será adicionado ({formatTime(parseTime(game.tempo))} → {formatTime(parseTime(game.tempo) + duracao)})
        </div>
      )}
    </div>
  )
}

function getGameStatus(game) {
  if (game.data_zerado || game.ano_zerado) return 'zerado'
  if (game.ano_abandonado) return 'abandonado'
  if (game.data_inicio && !game.data_fim) {
    if (parseTime(game.tempo) > 0) return 'jogando'
    return 'backlog'
  }
  return game._status || 'backlog'
}

export default function GameDetailModal() {
  const { selectedGame, closeGame } = useGameDetail()

  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedGame])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') closeGame()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeGame])

  if (!selectedGame) return null

  const game = selectedGame
  const s = getConsoleStyle(game.console)
  const status = getGameStatus(game)
  const cfg = statusConfig[status] || statusConfig.backlog
  const t = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const p = h > 0 ? Math.min(Math.round((t / h) * 100), 100) : 0
  const onFire = status === 'jogando' && p >= 70

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeGame}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dash-bg border border-dash-border rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* header com capa */}
        <div className="relative h-[220px] md:h-[260px] overflow-hidden rounded-t-2xl">
          {game.capa && (
            <img
              src={game.capa}
              alt={game.nome}
              className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dash-bg via-dash-bg/60 to-transparent" />

          {/* close button */}
          <button
            onClick={closeGame}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* capa + info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-4">
            {game.capa ? (
              <img
                src={game.capa}
                alt={game.nome}
                className="w-[100px] h-[140px] md:w-[120px] md:h-[165px] object-cover rounded-lg shadow-xl border-2"
                style={{ borderColor: `${s.col}60` }}
              />
            ) : (
              <div
                className="w-[100px] h-[140px] md:w-[120px] md:h-[165px] bg-dash-surface rounded-lg border-2 flex items-center justify-center text-3xl"
                style={{ borderColor: `${s.col}60` }}
              >
                <Gamepad2 size={32} className="text-dash-muted" />
              </div>
            )}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 text-[0.65em] font-black uppercase px-2 py-0.5 rounded-full border"
                  style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}15` }}
                >
                  {cfg.icon} {cfg.label}
                </span>
                <ConsoleBadge console={game.console} />
                {onFire && (
                  <span className="inline-flex items-center gap-0.5 text-[0.65em] font-black text-orange-500 bg-orange-500/10 border border-orange-500/25 px-2 py-0.5 rounded-full">
                    <Flame size={12} strokeWidth={2.5} className="animate-flame" /> ON FIRE
                  </span>
                )}
              </div>
              <h2 className="font-heading font-black text-white text-xl md:text-2xl leading-tight truncate">
                {game.nome}
              </h2>
              {game.genero && (
                <div className="text-[0.75em] text-dash-muted font-bold mt-1">{game.genero}</div>
              )}
            </div>
          </div>
        </div>

        {/* body */}
        <div className="p-5 space-y-4">
          {/* stat pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <StatPill
              icon={<Clock size={12} strokeWidth={2.5} />}
              label="Tempo"
              value={formatTime(t)}
              color={s.col}
            />
            {h > 0 && (
              <StatPill
                icon={<Target size={12} strokeWidth={2.5} />}
                label="HLTB"
                value={`${h}h`}
                color="#94a3b8"
              />
            )}
            {game.nota != null && game.nota !== '' && (
              <StatPill
                icon={<Star size={12} strokeWidth={2.5} />}
                label="Nota"
                value={`${game.nota}/10`}
                color={game.nota >= 9 ? '#ffcc00' : game.nota >= 7 ? '#00ff9f' : '#94a3b8'}
              />
            )}
            {game.data_inicio && (
              <StatPill
                icon={<Calendar size={12} strokeWidth={2.5} />}
                label="Início"
                value={formatDateBR(game.data_inicio)}
              />
            )}
            {game.data_zerado && (
              <StatPill
                icon={<Calendar size={12} strokeWidth={2.5} />}
                label="Zerado"
                value={formatDateBR(game.data_zerado)}
                color="#00ff9f"
              />
            )}
          </div>

          {/* progress */}
          <ProgressSection tempo={game.tempo} hltb={game.hltb} consoleStyle={s} />

          {/* ETA */}
          <EtaSection game={game} />

          {/* session logger — only for active games with _id */}
          {(status === 'jogando' || status === 'pausado') && (
            <SessionLogger game={game} />
          )}
        </div>
      </div>
    </div>
  )
}
