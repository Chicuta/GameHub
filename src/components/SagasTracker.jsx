import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getConsoleStyle, escapeIlike } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import { Swords, ChevronDown, Check, Clock, Plus, Trash2, X, Pencil } from 'lucide-react'
import toast from 'react-hot-toast'

const inputCls = 'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors'

/* ── Progress Bar ──────────────────────────────── */
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

/* ── Game Mini Card ────────────────────────────── */
function GameMiniCard({ game, onToggle, onRemove }) {
  const { t } = useTranslation()
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
    const { error } = await supabase
      .from('user_saga_games')
      .update({ done: newDone })
      .eq('id', game.id)
    if (!error) {
      onToggle(game.id, newDone)
      toast.success(newDone ? t('sagas.markedDone', { name: game.nome }) : t('sagas.unmarked', { name: game.nome }))
    }
    setToggling(false)
  }

  const handleRemove = async (e) => {
    e.stopPropagation()
    if (!supabase) return
    const { error } = await supabase.from('user_saga_games').delete().eq('id', game.id)
    if (!error) onRemove(game.id)
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

      {game.done ? (
        <button onClick={handleToggle} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-accent-success flex items-center justify-center shadow-lg hover:bg-accent-success/80 transition-colors cursor-pointer z-10" title="Desmarcar">
          <Check size={12} strokeWidth={3} className="text-black" />
        </button>
      ) : user && (
        <button onClick={handleToggle} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 hover:bg-accent-success/30 hover:border-accent-success/50" title="Marcar como concluído">
          <Check size={10} strokeWidth={2.5} className="text-white/50" />
        </button>
      )}

      {user && (
        <button onClick={handleRemove} className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 hover:bg-accent-danger/30 hover:border-accent-danger/50" title="Remover da saga">
          <Trash2 size={9} strokeWidth={2.5} className="text-white/50" />
        </button>
      )}

      {game.hltb > 0 && (
        <div className="absolute top-1 left-1 text-[0.5em] font-black bg-black/70 text-dash-muted px-1 py-0.5 rounded flex items-center gap-0.5">
          <Clock size={8} strokeWidth={2.5} /> {Number(game.hltb).toFixed(0)}h
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-1.5 pt-6">
        <div className="text-[0.55em] font-black text-white leading-tight truncate">{game.nome}</div>
        <div className="text-[0.45em] font-bold mt-0.5" style={{ color: s.col }}>{game.ano || ''} • {s.name}</div>
      </div>
    </div>
  )
}

/* ── Add Game to Saga (search from DB) ─────────── */
function AddGameToSaga({ sagaId, onAdded }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [adding, setAdding] = useState(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim() || query.length < 2) { setResults([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      const { data } = await supabase
        .from('games')
        .select('id, nome, capa, plataformas, data_lancamento, hltb_main')
        .ilike('nome', `%${escapeIlike(query)}%`)
        .order('igdb_rating', { ascending: false, nullsFirst: false })
        .limit(15)
      setResults(data || [])
      setSearching(false)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  async function addGame(game) {
    setAdding(game.id)
    const year = game.data_lancamento ? new Date(game.data_lancamento).getFullYear() : null
    const { data, error } = await supabase
      .from('user_saga_games')
      .insert({
        saga_id: sagaId,
        nome: game.nome,
        console: game.plataformas?.[0] || '',
        ano: year,
        hltb: game.hltb_main || null,
        capa: game.capa,
        done: false,
      })
      .select()
      .single()
    if (!error && data) {
      toast.success(t('sagas.addedToSaga', { name: game.nome }))
      onAdded(data)
      setQuery('')
      setResults([])
    } else {
      toast.error(t('sagas.addError'))
    }
    setAdding(null)
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex items-center gap-1 text-xs text-accent-cyan hover:text-white transition-colors cursor-pointer mt-2">
        <Plus size={14} strokeWidth={2.5} /> {t('sagas.addGame')}
      </button>
    )
  }

  return (
    <div className="mt-3 bg-black/30 rounded-lg border border-white/5 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-dash-muted">{t('sagas.searchCatalog')}</span>
        <button onClick={() => { setOpen(false); setQuery(''); setResults([]) }} className="text-dash-muted hover:text-white cursor-pointer"><X size={14} /></button>
      </div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t('sagas.searchPlaceholder')}
        autoFocus
        className={inputCls}
      />
      {searching && <div className="text-center text-dash-muted text-xs py-3">Buscando...</div>}
      <div className="max-h-[200px] overflow-y-auto mt-2 space-y-1">
        {results.map(g => (
          <button
            key={g.id}
            onClick={() => addGame(g)}
            disabled={adding === g.id}
            className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer disabled:opacity-50"
          >
            {g.capa ? (
              <img src={g.capa} alt="" className="w-8 h-11 rounded object-cover shrink-0" />
            ) : (
              <div className="w-8 h-11 rounded bg-white/5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-bold truncate">{g.nome}</div>
              <div className="text-dash-muted text-[0.6rem]">{g.data_lancamento?.substring(0, 4)} • {g.plataformas?.slice(0, 2).join(', ')}</div>
            </div>
            <Plus size={14} className="text-accent-cyan shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Saga Card ─────────────────────────────────── */
function SagaCard({ saga, onToggleGame, onRemoveGame, onAddGame, onDeleteSaga, onEditSaga }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const done = saga.games.filter(g => g.done).length
  const total = saga.games.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const totalHltb = saga.games.reduce((sum, g) => sum + (Number(g.hltb) || 0), 0)
  const doneHltb = saga.games.filter(g => g.done).reduce((sum, g) => sum + (Number(g.hltb) || 0), 0)

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
    <div className={`bg-dash-surface rounded-xl border overflow-hidden transition-all duration-300 ${open ? 'border-white/15' : 'border-white/5 hover:border-white/10'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-white/[0.02] transition-colors">
        <span className="text-2xl">{saga.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-heading font-black text-white text-sm uppercase tracking-wider truncate">{saga.nome}</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 max-w-[200px]">
              <SagaProgress done={done} total={total} color={accentColor} />
            </div>
            <div className="flex gap-2 text-[0.6em] font-bold text-dash-muted">
              {totalHltb > 0 && <span>{t('sagas.totalHours', { hours: totalHltb.toFixed(0) })}</span>}
              <span>{t('sagas.gamesCount', { done, total })}</span>
            </div>
          </div>
        </div>
        <ChevronDown size={18} strokeWidth={2.5} className={`text-dash-muted transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-[0.6em] font-black px-2 py-1 rounded-full border" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}>
              {pct}{t('sagas.percentComplete')}
            </span>
            {totalHltb > 0 && (
              <span className="text-[0.6em] font-black px-2 py-1 rounded-full border border-white/10 text-dash-muted bg-white/5">
                {t('sagas.hoursPlayed', { done: doneHltb.toFixed(0), total: totalHltb.toFixed(0) })}
              </span>
            )}
            {user && (
              <div className="ml-auto flex gap-1">
                <button onClick={(e) => { e.stopPropagation(); onEditSaga(saga) }} className="text-dash-muted hover:text-accent-cyan transition-colors cursor-pointer p-1" title="Editar saga">
                  <Pencil size={13} strokeWidth={2.5} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDeleteSaga(saga.id) }} className="text-dash-muted hover:text-accent-danger transition-colors cursor-pointer p-1" title="Deletar saga">
                  <Trash2 size={13} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {saga.games.length === 0 ? (
            <div className="text-center text-dash-muted text-xs py-6">
              {t('sagas.emptyState')}
            </div>
          ) : (
            consoleGroups.map(([consoleName, games]) => {
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
                    {games.map((g) => (
                      <GameMiniCard
                        key={g.id}
                        game={g}
                        onToggle={(gameId, done) => onToggleGame(saga.id, gameId, done)}
                        onRemove={(gameId) => onRemoveGame(saga.id, gameId)}
                      />
                    ))}
                  </div>
                </div>
              )
            })
          )}

          {user && <AddGameToSaga sagaId={saga.id} onAdded={(game) => onAddGame(saga.id, game)} />}
        </div>
      )}
    </div>
  )
}

/* ── Create / Edit Saga Modal ──────────────────── */
function SagaFormModal({ saga, onClose, onSaved }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [nome, setNome] = useState(saga?.nome || '')
  const [emoji, setEmoji] = useState(saga?.emoji || '🎮')
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    if (!nome.trim()) { toast.error(t('sagas.nameRequired')); return }
    setSaving(true)
    if (saga) {
      const { error } = await supabase
        .from('user_sagas')
        .update({ nome: nome.trim(), emoji })
        .eq('id', saga.id)
      if (error) toast.error(error.message)
      else { toast.success(t('sagas.updated')); onSaved() }
    } else {
      const { data, error } = await supabase
        .from('user_sagas')
        .insert({ user_id: user.id, nome: nome.trim(), emoji })
        .select()
        .single()
      if (error) toast.error(error.message)
      else { toast.success(t('sagas.created')); onSaved(data) }
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-dash-surface border border-dash-border rounded-2xl max-w-sm w-full p-5" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-dash-muted hover:text-white cursor-pointer"><X size={18} /></button>
        <h3 className="font-heading font-black text-white uppercase tracking-wider text-sm mb-4">
          {saga ? t('sagas.editSaga') : t('sagas.newSaga')}
        </h3>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-dash-muted mb-1">{t('sagas.name')}</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Castlevania" autoFocus className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-dash-muted mb-1">{t('sagas.emoji')}</label>
            <input type="text" value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="🎮" className={`${inputCls} w-20 text-center text-xl`} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg font-heading font-black uppercase tracking-wider text-sm bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all disabled:opacity-50 cursor-pointer">
              {saving ? 'Salvando...' : saga ? t('common.save') : t('sagas.createSaga')}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg border border-white/10 text-dash-muted text-sm hover:bg-white/5 transition-colors cursor-pointer">
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Main Component ────────────────────────────── */
export default function SagasTracker() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [sagas, setSagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSaga, setEditingSaga] = useState(null)

  const loadSagas = useCallback(async () => {
    if (!supabase || !user) { setSagas([]); setLoading(false); return }
    const { data, error } = await supabase
      .from('user_sagas')
      .select('*, user_saga_games(*)')
      .eq('user_id', user.id)
      .order('created_at')
    if (!error && data) {
      setSagas(data.map(s => ({
        ...s,
        games: (s.user_saga_games || []).sort((a, b) => (a.position || 0) - (b.position || 0)),
      })))
    }
    setLoading(false)
  }, [user])

  useEffect(() => { loadSagas() }, [loadSagas])

  const handleToggleGame = useCallback((sagaId, gameId, done) => {
    setSagas(prev => prev.map(s =>
      s.id === sagaId
        ? { ...s, games: s.games.map(g => g.id === gameId ? { ...g, done } : g) }
        : s
    ))
  }, [])

  const handleRemoveGame = useCallback((sagaId, gameId) => {
    setSagas(prev => prev.map(s =>
      s.id === sagaId
        ? { ...s, games: s.games.filter(g => g.id !== gameId) }
        : s
    ))
  }, [])

  const handleAddGame = useCallback((sagaId, game) => {
    setSagas(prev => prev.map(s =>
      s.id === sagaId
        ? { ...s, games: [...s.games, game] }
        : s
    ))
  }, [])

  const handleDeleteSaga = useCallback(async (sagaId) => {
    if (!supabase) return
    const { error } = await supabase.from('user_sagas').delete().eq('id', sagaId)
    if (!error) {
      setSagas(prev => prev.filter(s => s.id !== sagaId))
      toast.success(t('sagas.deleted'))
    }
  }, [])

  const handleSaved = useCallback(() => {
    setShowForm(false)
    setEditingSaga(null)
    loadSagas()
  }, [loadSagas])

  const sorted = useMemo(() => {
    return [...sagas].sort((a, b) => {
      const pctA = a.games.length > 0 ? a.games.filter(g => g.done).length / a.games.length : 0
      const pctB = b.games.length > 0 ? b.games.filter(g => g.done).length / b.games.length : 0
      const groupA = pctA === 1 ? 2 : pctA > 0 ? 0 : 1
      const groupB = pctB === 1 ? 2 : pctB > 0 ? 0 : 1
      if (groupA !== groupB) return groupA - groupB
      return pctB - pctA
    })
  }, [sagas])

  if (!user) return null

  const totalGames = sagas.reduce((s, saga) => s + saga.games.length, 0)
  const totalDone = sagas.reduce((s, saga) => s + saga.games.filter(g => g.done).length, 0)

  return (
    <div className="mb-8">
      <SectionTitle icon={<Swords size={22} strokeWidth={2.5} className="text-accent-purple" />}>
        {t('sagas.title', { done: totalDone, total: totalGames })}
      </SectionTitle>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {sorted.length === 0 && (
            <div className="text-center py-10 text-dash-muted">
              <Swords size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm mb-1">{t('sagas.noSagas')}</p>
              <p className="text-xs">{t('sagas.hint')}</p>
            </div>
          )}
          <div className="space-y-3">
            {sorted.map(saga => (
              <SagaCard
                key={saga.id}
                saga={saga}
                onToggleGame={handleToggleGame}
                onRemoveGame={handleRemoveGame}
                onAddGame={handleAddGame}
                onDeleteSaga={handleDeleteSaga}
                onEditSaga={(s) => setEditingSaga(s)}
              />
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-accent-purple/30 text-accent-purple font-heading font-black uppercase tracking-wider text-sm hover:bg-accent-purple/5 hover:border-accent-purple/50 transition-all cursor-pointer"
          >
            <Plus size={16} className="inline-block align-[-0.15em] mr-1" /> {t('sagas.createNewSaga')}
          </button>
        </>
      )}

      {showForm && <SagaFormModal saga={null} onClose={() => setShowForm(false)} onSaved={handleSaved} />}
      {editingSaga && <SagaFormModal saga={editingSaga} onClose={() => setEditingSaga(null)} onSaved={handleSaved} />}
    </div>
  )
}
