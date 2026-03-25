import { useState, useMemo, useEffect, useCallback } from 'react'
import { getConsoleStyle } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import { Swords, ChevronDown, Check, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import sagasData from '../data/sagas.json'

function SagaProgress({ done, total, color }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div>
      <div className="flex justify-between text-[0.7em] font-extrabold mb-1">
        <span style={{ color }}>{pct}%</span>
        <span className="text-dash-muted">{done}/{total}</span>
      </div>
      <div className="h-2 bg-black/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? 'linear-gradient(90deg, #ffcc00, #ff8800)'
              : pct >= 50
                ? `linear-gradient(90deg, ${color}, ${color}cc)`
                : `${color}99`,
          }}
        />
      </div>
    </div>
  )
}

function GameMiniCard({ game, sagaNome, onToggle }) {
  const { openGame } = useGameDetail()
  const { user } = useAuth()
  const s = getConsoleStyle(game.console)
  const [toggling, setToggling] = useState(false)

  const handleClick = () => {
    openGame({
      nome: game.nome,
      console: game.console,
      capa: game.capa,
      tempo: 0,
      hltb: game.hltb,
      genero: '',
      nota: null,
      _status: game.done ? 'zerado' : 'backlog',
    })
  }

  const handleToggle = async (e) => {
    e.stopPropagation()
    if (!user || !supabase || toggling) return
    setToggling(true)
    const newDone = !game.done
    try {
      const { error } = await supabase
        .from('user_saga_progress')
        .upsert({
          user_id: user.id,
          saga_nome: sagaNome,
          game_nome: game.nome,
          done: newDone,
        }, { onConflict: 'user_id,saga_nome,game_nome' })
      if (!error) {
        onToggle(sagaNome, game.nome, newDone)
        toast.success(newDone ? `${game.nome} concluído!` : `${game.nome} desmarcado`)
      }
    } catch {}
    setToggling(false)
  }

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group ${
        game.done
          ? 'hover:scale-105 hover:shadow-[0_0_12px_rgba(0,255,159,0.2)]'
          : 'grayscale-[60%] opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105'
      }`}
      style={{ aspectRatio: '2/3' }}
    >
      {game.capa ? (
        <img src={game.capa} alt={game.nome} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-dash-surface flex items-center justify-center text-dash-muted text-xs font-bold text-center px-1">
          {game.nome}
        </div>
      )}

      {/* done badge / toggle */}
      {game.done ? (
        <button
          onClick={handleToggle}
          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-accent-success flex items-center justify-center shadow-lg hover:bg-accent-success/80 transition-colors cursor-pointer z-10"
          title="Desmarcar conclusão"
        >
          <Check size={12} strokeWidth={3} className="text-black" />
        </button>
      ) : user && (
        <button
          onClick={handleToggle}
          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 hover:bg-accent-success/30 hover:border-accent-success/50"
          title="Marcar como concluído"
        >
          <Check size={10} strokeWidth={2.5} className="text-white/50" />
        </button>
      )}

      {/* hltb badge */}
      {game.hltb && (
        <div className="absolute top-1 left-1 text-[0.5em] font-black bg-black/70 text-dash-muted px-1 py-0.5 rounded flex items-center gap-0.5">
          <Clock size={8} strokeWidth={2.5} /> {game.hltb.toFixed(0)}h
        </div>
      )}

      {/* overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-1.5 pt-6">
        <div className="text-[0.55em] font-black text-white leading-tight truncate">{game.nome}</div>
        <div className="text-[0.45em] font-bold mt-0.5" style={{ color: s.col }}>{game.ano || ''} • {s.name}</div>
      </div>
    </div>
  )
}

function SagaCard({ saga, onToggle }) {
  const [open, setOpen] = useState(false)
  const done = saga.games.filter(g => g.done).length
  const total = saga.games.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const totalHltb = saga.games.reduce((sum, g) => sum + (g.hltb || 0), 0)
  const doneHltb = saga.games.filter(g => g.done).reduce((sum, g) => sum + (g.hltb || 0), 0)

  const accentColor = pct === 100 ? '#ffcc00' : pct >= 50 ? '#00ff9f' : pct > 0 ? '#00f5ff' : '#94a3b8'

  const consoleGroups = useMemo(() => {
    const groups = {}
    for (const g of saga.games) {
      const key = g.console || 'Outro'
      if (!groups[key]) groups[key] = []
      groups[key].push(g)
    }
    return Object.entries(groups).sort((a, b) => {
      const aYear = Math.min(...a[1].map(g => g.ano || 9999))
      const bYear = Math.min(...b[1].map(g => g.ano || 9999))
      return aYear - bYear
    })
  }, [saga.games])

  return (
    <div className={`bg-dash-surface rounded-xl border overflow-hidden transition-all duration-300 ${
      open ? 'border-white/15' : 'border-white/5 hover:border-white/10'
    }`}>
      {/* header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-2xl">{saga.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-heading font-black text-white text-sm uppercase tracking-wider truncate">
            {saga.nome}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 max-w-[200px]">
              <SagaProgress done={done} total={total} color={accentColor} />
            </div>
            <div className="flex gap-2 text-[0.6em] font-bold text-dash-muted">
              {totalHltb > 0 && <span>{totalHltb.toFixed(0)}h total</span>}
              <span>{done}/{total} jogos</span>
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          className={`text-dash-muted transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* expanded content */}
      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          {/* stats pills */}
          <div className="flex flex-wrap gap-2 py-3">
            <span className="text-[0.6em] font-black px-2 py-1 rounded-full border" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}>
              {pct}% completo
            </span>
            {totalHltb > 0 && (
              <span className="text-[0.6em] font-black px-2 py-1 rounded-full border border-white/10 text-dash-muted bg-white/5">
                {doneHltb.toFixed(0)}h / {totalHltb.toFixed(0)}h jogadas
              </span>
            )}
          </div>

          {/* games by console */}
          {consoleGroups.map(([consoleName, games]) => {
            const s = getConsoleStyle(consoleName)
            const groupDone = games.filter(g => g.done).length
            return (
              <div key={consoleName} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <ConsoleBadge console={consoleName} />
                  <span className="text-[0.6em] font-bold text-dash-muted">{groupDone}/{games.length}</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1.5 sm:gap-2">
                  {games.map((g, i) => <GameMiniCard key={`${g.nome}-${i}`} game={g} sagaNome={saga.nome} onToggle={onToggle} />)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function SagasTracker() {
  const { user } = useAuth()
  const [progressMap, setProgressMap] = useState({})

  // Load user's saga progress from Supabase
  useEffect(() => {
    if (!supabase || !user) return
    ;(async () => {
      const { data, error } = await supabase
        .from('user_saga_progress')
        .select('saga_nome, game_nome, done')
        .eq('user_id', user.id)
      if (!error && data) {
        const map = {}
        for (const row of data) {
          const key = `${row.saga_nome}::${row.game_nome}`
          map[key] = row.done
        }
        setProgressMap(map)
      }
    })()
  }, [user])

  const handleToggle = useCallback((sagaNome, gameNome, done) => {
    setProgressMap(prev => ({ ...prev, [`${sagaNome}::${gameNome}`]: done }))
  }, [])

  // Merge static JSON with user progress
  const mergedSagas = useMemo(() => {
    return sagasData.map(saga => ({
      ...saga,
      games: saga.games.map(g => {
        const key = `${saga.nome}::${g.nome}`
        const userDone = progressMap[key]
        return { ...g, done: userDone !== undefined ? userDone : g.done }
      }),
    }))
  }, [progressMap])

  const sorted = useMemo(() => {
    return [...mergedSagas].sort((a, b) => {
      const pctA = a.games.length > 0 ? a.games.filter(g => g.done).length / a.games.length : 0
      const pctB = b.games.length > 0 ? b.games.filter(g => g.done).length / b.games.length : 0
      const groupA = pctA === 1 ? 2 : pctA > 0 ? 0 : 1
      const groupB = pctB === 1 ? 2 : pctB > 0 ? 0 : 1
      if (groupA !== groupB) return groupA - groupB
      return pctB - pctA
    })
  }, [mergedSagas])

  if (sagasData.length === 0) return null

  const totalGames = mergedSagas.reduce((s, saga) => s + saga.games.length, 0)
  const totalDone = mergedSagas.reduce((s, saga) => s + saga.games.filter(g => g.done).length, 0)

  return (
    <div className="mb-8">
      <SectionTitle icon={<Swords size={22} strokeWidth={2.5} className="text-accent-purple" />}>
        SAGAS ({totalDone}/{totalGames})
      </SectionTitle>
      <div className="space-y-3">
        {sorted.map(saga => <SagaCard key={saga.nome} saga={saga} onToggle={handleToggle} />)}
      </div>
    </div>
  )
}
