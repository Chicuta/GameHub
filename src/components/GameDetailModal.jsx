import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGameDetail } from '../contexts/GameDetailContext'
import { useUserGames } from '../contexts/UserGamesContext'
import { useAuth } from '../contexts/AuthContext'
import { parseTime, formatTime, getConsoleStyle, daysBetween, todayStr, formatDateBR } from '../utils/helpers'
import { fetchSessions, createSession, updateSession, deleteSession } from '../lib/gamesApi'
import { supabase } from '../lib/supabase'
import ConsoleBadge from './ConsoleBadge'
import { X, Clock, Target, Calendar, Star, Flame, TrendingUp, Gamepad2, Plus, Timer, Trophy, Pencil, Trash2, History, ChevronDown, ChevronUp, ImagePlus } from 'lucide-react'
import toast from 'react-hot-toast'

function StatPill({ icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-black/30 rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-white/5 min-w-[80px] sm:min-w-[100px]">
      <div className="text-[0.65em] font-bold uppercase tracking-wider text-dash-muted flex items-center gap-1">
        {icon} {label}
      </div>
      <div className="text-base font-black" style={{ color: color || '#fff' }}>{value}</div>
    </div>
  )
}

function ProgressSection({ tempo, hltb, consoleStyle }) {
  const { t } = useTranslation()
  const played = parseTime(tempo)
  const h = parseFloat(hltb) || 0
  const p = h > 0 ? Math.min(Math.round((played / h) * 100), 100) : 0
  const restante = h > 0 ? Math.max(h - played, 0) : 0
  const over = h > 0 && played > h

  const barColor = over
    ? '#ff0055'
    : p >= 80
      ? '#00ff9f'
      : consoleStyle.col

  const grad = over
    ? 'linear-gradient(90deg, #ff0055, #ff4488)'
    : `linear-gradient(90deg, ${barColor}, ${barColor}99)`

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
      <div className="flex justify-between text-sm font-extrabold mb-2">
        <span style={{ color: barColor }}>{p}%{over ? ' ⚠️' : ''} {t('gameDetail.completed')}</span>
        <span className="text-dash-muted">{formatTime(played)} / {h > 0 ? `${h}h` : '—'}</span>
      </div>
      <div className="h-3 bg-black/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 relative"
          style={{ width: `${Math.min(p, 100)}%`, background: grad }}
        >
          {p >= 15 && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shine-swipe"
                style={{ width: '30%' }}
              />
            </div>
          )}
        </div>
      </div>
      {h > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div className="text-[0.7em] font-bold text-dash-muted">
            {restante > 0 ? `${formatTime(restante)} ${t('gameDetail.remaining')}` : over ? `+${formatTime(played - h)} além do HLTB` : '✅ HLTB atingido!'}
          </div>
          {restante > 0 && (
            <div className="text-[0.65em] font-black px-2 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
              {t('gameDetail.hoursLeft', { hours: restante.toFixed(1) })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function EtaSection({ game }) {
  const { t } = useTranslation()
  const played = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const dataInicio = game.data_inicio
  const hoje = todayStr()

  if (!dataInicio || h <= 0 || played <= 0) return null

  const diasDecorridos = Math.max(1, daysBetween(dataInicio, hoje))
  const hPorDia = played / diasDecorridos
  const restante = Math.max(h - played, 0)

  if (restante === 0) return null

  const diasRestantes = Math.ceil(restante / hPorDia)
  const dataEstimada = new Date()
  dataEstimada.setDate(dataEstimada.getDate() + diasRestantes)
  const dataEstimadaStr = dataEstimada.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5">
      <div className="text-[0.7em] font-black uppercase tracking-wider text-dash-muted mb-3 flex items-center gap-1.5">
        <TrendingUp size={14} strokeWidth={2.5} /> {t('gameDetail.etaTitle')}
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-black text-accent-cyan">{formatTime(hPorDia)}</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">{t('gameDetail.perDay')}</div>
        </div>
        <div>
          <div className="text-lg font-black text-accent-success">~{diasRestantes}d</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">{t('gameDetail.remaining')}</div>
        </div>
        <div>
          <div className="text-lg font-black text-accent-gold">{dataEstimadaStr}</div>
          <div className="text-[0.6em] font-bold text-dash-muted uppercase">{t('gameDetail.forecast')}</div>
        </div>
      </div>
    </div>
  )
}

const PLATFORM_OPTIONS = [
  'Arcade', 'Dreamcast', 'Game Boy', 'Game Boy Color', 'Game Boy Advance',
  'Game Gear', 'Master System', 'Mega Drive', 'Neo Geo', 'Neo Geo CD',
  'NeoGeo Pocket', 'Nes', 'Nintendo DS', 'Nintendo 3DS', 'Nintendo 64',
  'Pc Engine', 'Playstation 1', 'Playstation 2', 'Playstation 3',
  'Playstation 4', 'Playstation 5', 'Sega CD', 'Sega Saturn',
  'SNES', 'Steam Deck', 'Nintendo Switch', 'Wii', 'Wonderswan',
  'Xbox 360', 'Xbox One', 'Xbox Series', 'PC',
]

function PlatformEditor({ game, status }) {
  const { t } = useTranslation()
  const { updateGame, reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleChange(newConsole) {
    if (newConsole === game.console || !newConsole) {
      setEditing(false)
      return
    }
    setSaving(true)
    if (game._id) {
      const err = await updateGame(game._id, { console: newConsole })
      if (!err) {
        toast.success(t('gameDetail.platformChanged'))
        await reload()
        openGame({ ...game, console: newConsole })
      }
    } else if (game._sagaGameId) {
      const { error } = await supabase
        .from('user_saga_games')
        .update({ console: newConsole })
        .eq('id', game._sagaGameId)
      if (!error) {
        toast.success(t('gameDetail.platformChanged'))
        openGame({ ...game, console: newConsole })
      }
    } else {
      openGame({ ...game, console: newConsole })
    }
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <select
        autoFocus
        value={game.console || ''}
        onChange={e => handleChange(e.target.value)}
        onBlur={() => setEditing(false)}
        disabled={saving}
        className="bg-black/60 border border-accent-cyan/40 rounded text-[0.6em] font-bold text-white px-1.5 py-0.5 focus:outline-none cursor-pointer"
      >
        {game.console && !PLATFORM_OPTIONS.includes(game.console) && (
          <option value={game.console}>{game.console}</option>
        )}
        {PLATFORM_OPTIONS.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="inline-flex items-center gap-1 cursor-pointer group"
      title={t('gameDetail.changePlatform')}
    >
      <ConsoleBadge console={game.console} />
      <Pencil size={10} strokeWidth={2.5} className="text-accent-cyan/70 group-hover:text-accent-cyan transition-colors" />
    </button>
  )
}

const GENRE_OPTIONS = [
  'Ação', 'Aventura', 'RPG', 'JRPG', 'Souls-like',
  'FPS', 'TPS', 'Plataforma', 'Metroidvania',
  'Puzzle', 'Estratégia', 'Simulação', 'Corrida',
  'Esporte', 'Luta', 'Terror', 'Roguelike',
  'Sandbox', 'Mundo Aberto', 'Visual Novel', 'Indie', 'Outro',
]

function CoverEditor({ game }) {
  const { t } = useTranslation()
  const { reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [editing, setEditing] = useState(false)
  const [url, setUrl] = useState(game.capa || '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    const trimmed = url.trim()
    if (trimmed === (game.capa || '')) {
      setEditing(false)
      return
    }
    setSaving(true)
    if (game._gameId) {
      const { error } = await supabase
        .from('games')
        .update({ capa: trimmed || null })
        .eq('id', game._gameId)
      if (!error) {
        toast.success(t('gameDetail.coverChanged'))
        await reload()
        openGame({ ...game, capa: trimmed || null })
      }
    }
    setSaving(false)
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setUrl(game.capa || ''); setEditing(false) }
  }

  if (!game._gameId) return null

  if (editing) {
    return (
      <div className="absolute bottom-16 left-5 right-5 z-20 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-accent-cyan/30 space-y-2">
        <div className="text-[0.65em] font-black uppercase tracking-wider text-accent-cyan flex items-center gap-1.5">
          <ImagePlus size={12} strokeWidth={2.5} /> {t('gameDetail.changeCover')}
        </div>
        <input
          autoFocus
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('gameDetail.coverPlaceholder')}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-dash-muted"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => { setUrl(game.capa || ''); setEditing(false) }}
            className="px-3 py-1.5 rounded-lg bg-white/5 text-dash-muted font-black text-[0.65em] uppercase tracking-wider border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-accent-cyan/15 text-accent-cyan font-black text-[0.65em] uppercase tracking-wider border border-accent-cyan/30 hover:bg-accent-cyan/25 transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? '...' : t('common.save')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="absolute bottom-1 right-1 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white/60 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
      title={t('gameDetail.changeCover')}
    >
      <Pencil size={10} strokeWidth={2.5} />
    </button>
  )
}

function GenreEditor({ game }) {
  const { t } = useTranslation()
  const { reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleChange(newGenero) {
    if (newGenero === game.genero || !newGenero) {
      setEditing(false)
      return
    }
    setSaving(true)
    if (game._gameId) {
      const { error } = await supabase
        .from('games')
        .update({ generos: [newGenero] })
        .eq('id', game._gameId)
      if (!error) {
        toast.success(t('gameDetail.genreChanged'))
        await reload()
        openGame({ ...game, genero: newGenero })
      }
    }
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <select
        autoFocus
        value={game.genero || ''}
        onChange={e => handleChange(e.target.value)}
        onBlur={() => setEditing(false)}
        disabled={saving}
        className="bg-black/60 border border-accent-purple/40 rounded text-[0.6em] font-bold text-white px-1.5 py-0.5 focus:outline-none cursor-pointer"
      >
        <option value="">{t('common.select')}</option>
        {game.genero && !GENRE_OPTIONS.includes(game.genero) && (
          <option value={game.genero}>{game.genero}</option>
        )}
        {GENRE_OPTIONS.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="inline-flex items-center gap-1 cursor-pointer group text-[0.75em] text-dash-muted font-bold hover:text-accent-purple transition-colors"
      title={t('gameDetail.changeGenre')}
    >
      {game.genero || t('gameDetail.addGenre')}
      <Pencil size={10} strokeWidth={2.5} className="text-accent-purple/70 group-hover:text-accent-purple transition-colors" />
    </button>
  )
}

const statusConfig = {
  jogando: { label: 'status.playing', color: '#00f5ff', icon: <Flame size={14} strokeWidth={2.5} /> },
  zerado: { label: 'status.completed', color: '#00ff9f', icon: <Star size={14} strokeWidth={2.5} /> },
  jogado: { label: 'status.played', color: '#a78bfa', icon: <Trophy size={14} strokeWidth={2.5} /> },
  pausado: { label: 'status.paused', color: '#bc13fe', icon: <Clock size={14} strokeWidth={2.5} /> },
  abandonado: { label: 'status.abandoned', color: '#ff0055', icon: <X size={14} strokeWidth={2.5} /> },
  backlog: { label: 'status.backlog', color: '#94a3b8', icon: <Target size={14} strokeWidth={2.5} /> },
}

function SessionLogger({ game, onSessionAdded }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { updateGame, reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [open, setOpen] = useState(false)
  const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0])
  const [inicio, setInicio] = useState('')
  const [fim, setFim] = useState('')
  const [marcarZerado, setMarcarZerado] = useState(false)
  const [saving, setSaving] = useState(false)

  const duracao = (() => {
    if (!inicio || !fim) return null
    const [h1, m1] = inicio.split(':').map(Number)
    const [h2, m2] = fim.split(':').map(Number)
    let totalMin = (h2 * 60 + m2) - (h1 * 60 + m1)
    if (totalMin <= 0) totalMin += 1440
    if (totalMin <= 0) return null
    return totalMin / 60
  })()

  if (!game._id && !game._sagaGameId) return null

  async function handleSave() {
    if (!duracao || duracao <= 0) return
    setSaving(true)
    const currentTempo = parseTime(game.tempo)
    const newTempo = Math.round((currentTempo + duracao) * 100) / 100
    const today = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()

    try {
      let userGameId = game._id

      // Saga game without user_games entry — create one
      if (!userGameId && game._sagaGameId && user) {
        // Find or create a games catalog entry
        let gameId = null
        const { data: found } = await supabase
          .from('games')
          .select('id')
          .ilike('nome', game.nome)
          .limit(1)
          .single()
        if (found) {
          gameId = found.id
        } else {
          const { data: created, error: cErr } = await supabase
            .from('games')
            .insert({
              nome: game.nome,
              slug: game.nome.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              capa: game.capa || null,
              plataformas: game.console ? [game.console] : [],
            })
            .select('id')
            .single()
          if (cErr) throw cErr
          gameId = created.id
        }

        // Create user_games entry as jogando
        const { data: ug, error: ugErr } = await supabase
          .from('user_games')
          .upsert({
            user_id: user.id,
            game_id: gameId,
            status: 'jogando',
            console: game.console || null,
            tempo: newTempo,
            hltb: game.hltb ? parseFloat(game.hltb) : null,
            data_inicio: today,
          }, { onConflict: 'user_id,game_id' })
          .select('id')
          .single()
        if (ugErr) throw ugErr
        userGameId = ug.id
      }

      const fields = { tempo: newTempo }
      if (marcarZerado) {
        fields.status = 'zerado'
        fields.data_zerado = today
        fields.ano_zerado = year
      } else if (game._status === 'pausado' || game._status === 'backlog') {
        fields.status = 'jogando'
        fields.data_inicio = game.data_inicio || today
      }

      // Save session record
      if (user && userGameId) {
        await createSession({
          user_game_id: userGameId,
          user_id: user.id,
          session_date: sessionDate,
          start_time: inicio || null,
          end_time: fim || null,
          duration: Math.round(duracao * 100) / 100,
        })
      }

      const err = await updateGame(userGameId, fields)
      if (!err) {
        const msg = marcarZerado
          ? t('gameDetail.completedToast', { name: game.nome, time: formatTime(duracao) })
          : t('gameDetail.sessionToast', { time: formatTime(duracao) })
        toast.success(msg)
        await reload()
        if (marcarZerado) {
          openGame({ ...game, _id: userGameId, tempo: newTempo, data_zerado: today, ano_zerado: year, _status: 'zerado' })
        } else if (game._status === 'pausado' || game._status === 'backlog' || game._sagaGameId) {
          openGame({ ...game, _id: userGameId, tempo: newTempo, _status: 'jogando', data_inicio: game.data_inicio || today })
        } else {
          openGame({ ...game, _id: userGameId, tempo: newTempo })
        }
        onSessionAdded?.()
        setInicio('')
        setFim('')
        setSessionDate(new Date().toISOString().split('T')[0])
        setMarcarZerado(false)
        setOpen(false)
      } else {
        toast.error(t('gameDetail.sessionError'))
      }
    } catch (err) {
      toast.error(err.message || t('gameDetail.sessionError'))
    }
    setSaving(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent-cyan/30 text-accent-cyan font-heading font-black uppercase tracking-wider text-xs hover:bg-accent-cyan/5 hover:border-accent-cyan/50 transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <Timer size={14} strokeWidth={2.5} /> {t('gameDetail.registerSession')}
      </button>
    )
  }

  const inputCls = 'bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-accent-cyan transition-colors w-full'

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-accent-cyan/20">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[0.7em] font-black uppercase tracking-wider text-accent-cyan flex items-center gap-1.5">
          <Timer size={14} strokeWidth={2.5} /> {t('gameDetail.newSession')}
        </div>
        <button onClick={() => setOpen(false)} className="text-dash-muted hover:text-white cursor-pointer">
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
        <div>
          <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('sessions.date')}</label>
          <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('gameDetail.start')}</label>
          <input type="time" value={inicio} onChange={e => setInicio(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('gameDetail.end')}</label>
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
          {t('gameDetail.willBeAdded', { time: formatTime(duracao) })} ({formatTime(parseTime(game.tempo))} → {formatTime(parseTime(game.tempo) + duracao)})
        </div>
      )}
      {/* Marcar como zerado */}
      <label className="mt-3 flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={marcarZerado}
          onChange={e => setMarcarZerado(e.target.checked)}
          className="hidden"
        />
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          marcarZerado
            ? 'bg-accent-success border-accent-success'
            : 'border-white/20 group-hover:border-accent-success/50'
        }`}>
          {marcarZerado && <Trophy size={12} strokeWidth={3} className="text-black" />}
        </div>
        <span className={`text-xs font-black uppercase tracking-wider transition-colors ${
          marcarZerado ? 'text-accent-success' : 'text-dash-muted group-hover:text-white'
        }`}>
          {t('gameDetail.completedCheck')}
        </span>
      </label>
    </div>
  )
}

/* ── Session History ──────────────────────────────── */
function SessionHistory({ game }) {
  const { t } = useTranslation()
  const { updateGame, reload } = useUserGames()
  const { openGame } = useGameDetail()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(null)
  const [editData, setEditData] = useState({})

  const loadSessions = async () => {
    if (!game._id) return
    setLoading(true)
    const data = await fetchSessions(game._id)
    setSessions(data)
    setLoading(false)
  }

  useEffect(() => { loadSessions() }, [game._id])

  if (!game._id) return null

  const totalFromSessions = sessions.reduce((sum, s) => sum + (Number(s.duration) || 0), 0)

  async function recalcTempo() {
    const rounded = Math.round(totalFromSessions * 100) / 100
    const err = await updateGame(game._id, { tempo: rounded })
    if (!err) {
      toast.success(t('sessions.recalculated'))
      await reload()
      openGame({ ...game, tempo: rounded })
    }
  }

  async function handleDelete(session) {
    const { error } = await deleteSession(session.id)
    if (!error) {
      toast.success(t('sessions.deletedToast'))
      const newSessions = sessions.filter(s => s.id !== session.id)
      setSessions(newSessions)
      // Recalculate total
      const newTotal = Math.round(newSessions.reduce((sum, s) => sum + (Number(s.duration) || 0), 0) * 100) / 100
      await updateGame(game._id, { tempo: newTotal })
      await reload()
      openGame({ ...game, tempo: newTotal })
    }
  }

  function startEdit(session) {
    setEditing(session.id)
    setEditData({
      session_date: session.session_date,
      start_time: session.start_time?.slice(0, 5) || '',
      end_time: session.end_time?.slice(0, 5) || '',
      duration: session.duration,
    })
  }

  async function handleEditSave(sessionId) {
    // Recalculate duration if times changed
    let newDuration = editData.duration
    if (editData.start_time && editData.end_time) {
      const [h1, m1] = editData.start_time.split(':').map(Number)
      const [h2, m2] = editData.end_time.split(':').map(Number)
      let totalMin = (h2 * 60 + m2) - (h1 * 60 + m1)
      if (totalMin <= 0) totalMin += 1440
      if (totalMin > 0) newDuration = Math.round((totalMin / 60) * 100) / 100
    }

    const { error } = await updateSession(sessionId, {
      session_date: editData.session_date,
      start_time: editData.start_time || null,
      end_time: editData.end_time || null,
      duration: newDuration,
    })
    if (!error) {
      toast.success(t('sessions.updatedToast'))
      setEditing(null)
      await loadSessions()
      // Recalculate total
      const updated = sessions.map(s => s.id === sessionId ? { ...s, duration: newDuration } : s)
      const newTotal = Math.round(updated.reduce((sum, s) => sum + (Number(s.duration) || 0), 0) * 100) / 100
      await updateGame(game._id, { tempo: newTotal })
      await reload()
      openGame({ ...game, tempo: newTotal })
    }
  }

  const inputCls = 'bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-bold focus:outline-none focus:border-accent-cyan transition-colors w-full'

  return (
    <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-[0.7em] font-black uppercase tracking-wider text-dash-muted">
          <History size={14} strokeWidth={2.5} />
          {t('sessions.history')}
          {sessions.length > 0 && (
            <span className="text-accent-cyan font-bold normal-case">
              ({t('sessions.sessionCount', { count: sessions.length })})
            </span>
          )}
        </div>
        {expanded ? <ChevronUp size={14} className="text-dash-muted" /> : <ChevronDown size={14} className="text-dash-muted" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-xs text-dash-muted text-center py-3">{t('sessions.noSessions')}</p>
          ) : (
            <>
              {/* Header */}
              <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_auto] gap-2 text-[0.6em] font-bold uppercase text-dash-muted mb-2 px-1">
                <span>{t('sessions.date')}</span>
                <span>{t('sessions.start')}</span>
                <span>{t('sessions.end')}</span>
                <span>{t('sessions.duration')}</span>
                <span className="w-12" />
              </div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {sessions.map(s => (
                  <div key={s.id}>
                    {editing === s.id ? (
                      <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_auto] gap-2 items-center bg-black/30 rounded-lg p-2 border border-accent-cyan/20">
                        <input type="date" value={editData.session_date} onChange={e => setEditData({ ...editData, session_date: e.target.value })} className={inputCls} />
                        <input type="time" value={editData.start_time} onChange={e => setEditData({ ...editData, start_time: e.target.value })} className={inputCls} />
                        <input type="time" value={editData.end_time} onChange={e => setEditData({ ...editData, end_time: e.target.value })} className={inputCls} />
                        <span className="text-xs font-bold text-center text-accent-cyan">{formatTime(editData.start_time && editData.end_time ? (() => { const [h1,m1]=editData.start_time.split(':').map(Number); const [h2,m2]=editData.end_time.split(':').map(Number); let min=(h2*60+m2)-(h1*60+m1); if(min<=0) min+=1440; return min > 0 ? min/60 : editData.duration })() : editData.duration)}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleEditSave(s.id)} className="text-accent-success hover:text-white cursor-pointer text-xs font-black">✓</button>
                          <button onClick={() => setEditing(null)} className="text-dash-muted hover:text-white cursor-pointer text-xs font-black">✕</button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_auto] gap-2 items-center text-xs font-bold text-white/80 bg-black/20 rounded-lg px-2 py-1.5 hover:bg-black/30 transition-colors">
                        <span>{formatDateBR(s.session_date)}</span>
                        <span className="text-dash-muted">{s.start_time?.slice(0, 5) || '—'}</span>
                        <span className="text-dash-muted">{s.end_time?.slice(0, 5) || '—'}</span>
                        <span className="text-accent-cyan">{formatTime(s.duration)}</span>
                        <div className="flex gap-1">
                          <button onClick={() => startEdit(s)} className="text-dash-muted hover:text-accent-cyan cursor-pointer"><Pencil size={12} /></button>
                          <button onClick={() => handleDelete(s)} className="text-dash-muted hover:text-red-400 cursor-pointer"><Trash2 size={12} /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Total */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-[0.65em] font-black uppercase text-dash-muted">{t('sessions.total')}: <span className="text-accent-cyan">{formatTime(totalFromSessions)}</span></span>
                {Math.abs(totalFromSessions - parseTime(game.tempo)) > 0.02 && (
                  <button onClick={recalcTempo} className="text-[0.6em] font-bold text-accent-gold hover:text-white cursor-pointer underline">
                    {t('sessions.recalculated')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Remove from Backlog ──────────────────────── */
function RemoveFromBacklog({ game }) {
  const { t } = useTranslation()
  const { removeGame, reload } = useUserGames()
  const { closeGame } = useGameDetail()
  const [confirming, setConfirming] = useState(false)
  const [removing, setRemoving] = useState(false)

  async function handleRemove() {
    setRemoving(true)
    const err = await removeGame(game._id)
    if (!err) {
      toast.success(t('gameDetail.removedFromBacklog'))
      await reload()
      closeGame()
    }
    setRemoving(false)
  }

  if (confirming) {
    return (
      <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
        <p className="text-xs font-bold text-red-400 mb-3 text-center">{t('gameDetail.removeConfirm')}</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={handleRemove}
            disabled={removing}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 font-black text-xs uppercase tracking-wider border border-red-500/30 hover:bg-red-500/30 transition-colors cursor-pointer disabled:opacity-50"
          >
            {removing ? '...' : t('common.delete')}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 rounded-lg bg-white/5 text-dash-muted font-black text-xs uppercase tracking-wider border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-full py-2.5 rounded-xl border-2 border-dashed border-red-500/30 text-red-400 font-heading font-black uppercase tracking-wider text-xs hover:bg-red-500/5 hover:border-red-500/50 transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      <Trash2 size={14} strokeWidth={2.5} /> {t('gameDetail.removeFromBacklog')}
    </button>
  )
}

function getGameStatus(game) {
  if (game._isJogado || game._status === 'jogado') return 'jogado'
  if (game.data_zerado || game.ano_zerado) return 'zerado'
  if (game.ano_abandonado) return 'abandonado'
  if (game.data_inicio && !game.data_fim) {
    if (parseTime(game.tempo) > 0) return 'jogando'
    return 'backlog'
  }
  return game._status || 'backlog'
}

export default function GameDetailModal() {
  const { t } = useTranslation()
  const { selectedGame, closeGame } = useGameDetail()
  const modalRef = useRef(null)
  const touchStartY = useRef(0)
  const touchDeltaY = useRef(0)
  const [translateY, setTranslateY] = useState(0)
  const [sessionKey, setSessionKey] = useState(0)

  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = 'hidden'
      setTranslateY(0)
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

  // Swipe down to close
  function handleTouchStart(e) {
    const el = modalRef.current
    if (el && el.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY
    } else {
      touchStartY.current = 0
    }
  }

  function handleTouchMove(e) {
    if (!touchStartY.current) return
    const delta = e.touches[0].clientY - touchStartY.current
    if (delta > 0) {
      touchDeltaY.current = delta
      setTranslateY(delta)
    }
  }

  function handleTouchEnd() {
    if (touchDeltaY.current > 120) {
      closeGame()
    }
    touchDeltaY.current = 0
    touchStartY.current = 0
    setTranslateY(0)
  }

  if (!selectedGame) return null

  const game = selectedGame
  const s = getConsoleStyle(game.console)
  const status = getGameStatus(game)
  const cfg = statusConfig[status] || statusConfig.backlog
  const played = parseTime(game.tempo)
  const h = parseFloat(game.hltb) || 0
  const p = h > 0 ? Math.min(Math.round((played / h) * 100), 100) : 0
  const onFire = status === 'jogando' && p >= 70

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={closeGame}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ opacity: Math.max(0.3, 1 - translateY / 300) }} />

      {/* modal */}
      <div
        ref={modalRef}
        className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-dash-bg border border-dash-border rounded-t-2xl sm:rounded-2xl shadow-2xl transition-transform"
        style={{ transform: translateY > 0 ? `translateY(${translateY}px)` : undefined }}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe indicator (mobile) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
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
            <div className="relative group shrink-0">
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
              <CoverEditor game={game} />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 text-[0.65em] font-black uppercase px-2 py-0.5 rounded-full border"
                  style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}15` }}
                >
                  {cfg.icon} {t(cfg.label)}
                </span>
                <PlatformEditor game={game} status={status} />
                {onFire && (
                  <span className="inline-flex items-center gap-0.5 text-[0.65em] font-black text-orange-500 bg-orange-500/10 border border-orange-500/25 px-2 py-0.5 rounded-full">
                    <Flame size={12} strokeWidth={2.5} className="animate-flame" /> ON FIRE
                  </span>
                )}
              </div>
              <h2 className="font-heading font-black text-white text-xl md:text-2xl leading-tight truncate">
                {game.nome}
              </h2>
              <div className="mt-1">
                <GenreEditor game={game} />
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="p-5 space-y-4">
          {/* stat pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <StatPill
              icon={<Clock size={12} strokeWidth={2.5} />}
              label={t('gameDetail.time')}
              value={formatTime(played)}
              color={s.col}
            />
            {h > 0 && (
              <StatPill
                icon={<Target size={12} strokeWidth={2.5} />}
                label={t('gameDetail.hltb')}
                value={`${h}h`}
                color="#94a3b8"
              />
            )}
            {game.nota != null && game.nota !== '' && (
              <StatPill
                icon={<Star size={12} strokeWidth={2.5} />}
                label={t('gameDetail.rating')}
                value={`${game.nota}/10`}
                color={game.nota >= 9 ? '#ffcc00' : game.nota >= 7 ? '#00ff9f' : '#94a3b8'}
              />
            )}
            {game.data_inicio && (
              <StatPill
                icon={<Calendar size={12} strokeWidth={2.5} />}
                label={t('gameDetail.startDate')}
                value={formatDateBR(game.data_inicio)}
              />
            )}
            {game.data_zerado && (
              <StatPill
                icon={<Calendar size={12} strokeWidth={2.5} />}
                label={t('gameDetail.completedDate')}
                value={formatDateBR(game.data_zerado)}
                color="#00ff9f"
              />
            )}
          </div>

          {/* progress */}
          <ProgressSection tempo={game.tempo} hltb={game.hltb} consoleStyle={s} />

          {/* ETA */}
          <EtaSection game={game} />

          {/* session logger — for games with _id */}
          {game._id && (
            <SessionLogger game={game} onSessionAdded={() => setSessionKey(k => k + 1)} />
          )}

          {/* session history */}
          {game._id && (
            <SessionHistory key={sessionKey} game={game} />
          )}

          {/* remove game */}
          {game._id && (
            <RemoveFromBacklog game={game} />
          )}
        </div>
      </div>
    </div>
  )
}
