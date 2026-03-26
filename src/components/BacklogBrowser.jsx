import { useState, useMemo, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getConsoleStyle, parseTime, escapeIlike } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ConsoleBadge from './ConsoleBadge'
import toast from 'react-hot-toast'
import SectionTitle from './SectionTitle'
import HltbBar from './HltbBar'
import { Library, Search, Filter, SlidersHorizontal, Dices, ChevronDown, Plus, LayoutGrid, Globe, Loader2 } from 'lucide-react'
import Accordion from './Accordion'

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY

const SORT_OPTIONS = ['nome', 'console', 'hltb-asc', 'hltb-desc']
const SORT_LABEL_KEYS = {
  'nome': 'backlog.sortName',
  'console': 'backlog.sortPlatform',
  'hltb-asc': 'backlog.sortHltbAsc',
  'hltb-desc': 'backlog.sortHltbDesc',
}

function BacklogCard({ game }) {
  const { t } = useTranslation()
  const { openGame } = useGameDetail()
  const h = parseFloat(game.hltb) || 0
  const s = getConsoleStyle(game.console)

  return (
    <div
      onClick={() => openGame({ ...game, _status: 'backlog' })}
      className="bg-dash-surface rounded-lg border border-white/5 overflow-hidden flex flex-col h-[180px] sm:h-[220px] transition-all duration-300 hover:scale-[1.03] hover:border-accent-gold hover:shadow-[0_0_12px_rgba(255,204,0,0.15)] cursor-pointer group"
    >
      <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
        {game.capa ? (
          <img src={game.capa} alt={game.nome} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span title={t('common.noCover')}><Library size={28} className="text-dash-muted" /></span>
        )}
        {h > 0 && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5">
            <HltbBar tempo={game.tempo || 0} hltb={game.hltb} consoleColor={s.col} variant="mini" />
          </div>
        )}
      </div>
      <div className="px-2 py-1.5 bg-black/60 border-t border-white/5">
        <div className="font-black text-[0.7em] text-white truncate">{game.nome}</div>
        <ConsoleBadge console={game.console} />
      </div>
    </div>
  )
}

function RouletteResult({ game, onClose }) {
  const { t } = useTranslation()
  const { openGame } = useGameDetail()
  const s = getConsoleStyle(game.console)

  return (
    <div className="bg-gradient-to-br from-accent-gold/10 to-accent-purple/10 border-2 border-accent-gold/40 rounded-xl p-4 mb-4 flex items-center gap-4 animate-goty-pulse">
      {game.capa && (
        <img
          src={game.capa} alt={game.nome}
          className="w-[70px] h-[95px] rounded-lg object-cover border-2 cursor-pointer"
          style={{ borderColor: s.col }}
          onClick={() => openGame({ ...game, _status: 'backlog' })}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[0.65em] font-bold uppercase tracking-wider text-accent-gold mb-1">{t('backlog.shuffleResult')}</div>
        <div className="font-heading font-black text-white text-lg truncate">{game.nome}</div>
        <ConsoleBadge console={game.console} />
      </div>
      <button
        onClick={onClose}
        className="text-dash-muted hover:text-white text-lg px-2 cursor-pointer"
      >✕</button>
    </div>
  )
}

/* ── Quick-add game to backlog ───────────────── */
function QuickAddBacklog({ onAdded }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [adding, setAdding] = useState(null)
  const [rawgResults, setRawgResults] = useState([])
  const [rawgLoading, setRawgLoading] = useState(false)
  const [rawgSearched, setRawgSearched] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim() || query.length < 2) { setResults([]); setRawgResults([]); setRawgSearched(false); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      setRawgResults([]); setRawgSearched(false)
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .ilike('nome', `%${escapeIlike(query)}%`)
          .order('igdb_rating', { ascending: false, nullsFirst: false })
          .limit(12)
        if (error) throw error
        setResults(data || [])
      } catch { setResults([]) }
      finally { setSearching(false) }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  async function searchRawg() {
    if (!query.trim() || !RAWG_KEY) return
    setRawgLoading(true); setRawgSearched(true)
    try {
      const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(query.trim())}&page_size=12`)
      if (!res.ok) throw new Error('RAWG request failed')
      const data = await res.json()
      const localNames = new Set(results.map(g => g.nome.toLowerCase()))
      const localRawgIds = new Set(results.map(g => g.rawg_id).filter(Boolean))
      const filtered = (data.results || []).filter(g =>
        !localRawgIds.has(g.id) && !localNames.has(g.name.toLowerCase())
      )
      setRawgResults(filtered)
    } catch {
      setRawgResults([])
      toast.error(t('catalog.importError'))
    } finally { setRawgLoading(false) }
  }

  async function importAndAdd(rawgGame) {
    if (!user || !supabase) return
    setAdding(rawgGame.id)
    try {
      const generos = (rawgGame.genres || []).map(g => g.name)
      const plataformas = (rawgGame.platforms || []).map(p => p.platform?.name).filter(Boolean)
      const row = {
        rawg_id: rawgGame.id,
        nome: rawgGame.name,
        slug: rawgGame.slug,
        capa: rawgGame.background_image || null,
        generos: generos.length > 0 ? generos : null,
        plataformas: plataformas.length > 0 ? plataformas : null,
        data_lancamento: rawgGame.released || null,
        metacritic: rawgGame.metacritic || null,
        rawg_rating: rawgGame.rating || null,
      }
      const { data: imported, error: importErr } = await supabase
        .from('games').upsert(row, { onConflict: 'rawg_id' }).select().single()
      if (importErr) throw importErr

      const { error } = await supabase.from('user_games').upsert({
        user_id: user.id, game_id: imported.id, status: 'backlog',
      }, { onConflict: 'user_id,game_id' })
      if (error) throw error

      toast.success(t('backlog.addedToast', { name: imported.nome }))
      setRawgResults(prev => prev.filter(g => g.id !== rawgGame.id))
      setQuery(''); setResults([]); setRawgResults([]); setRawgSearched(false)
      onAdded?.()
    } catch (err) {
      toast.error(err.message || 'Erro')
    } finally { setAdding(null) }
  }

  async function addToBacklog(game) {
    if (!user || !supabase) return
    setAdding(game.id)
    try {
      const { error } = await supabase.from('user_games').upsert({
        user_id: user.id,
        game_id: game.id,
        status: 'backlog',
      }, { onConflict: 'user_id,game_id' })
      if (error) throw error
      toast.success(t('backlog.addedToast', { name: game.nome }))
      setQuery('')
      setResults([])
      onAdded?.()
    } catch (err) {
      toast.error(err.message || 'Erro')
    } finally { setAdding(null) }
  }

  return (
    <div className="mb-4">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-muted" strokeWidth={2.5} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('backlog.addSearchPlaceholder')}
          className="w-full bg-black/40 border border-accent-cyan/30 rounded-lg pl-8 pr-3 py-2 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors"
        />
      </div>
      {searching && <div className="text-center text-dash-muted text-xs py-3">{t('common.searching')}</div>}
      {!searching && query.length >= 2 && results.length === 0 && !rawgSearched && (
        <div className="text-center text-dash-muted text-xs py-3">{t('backlog.addNoResults')}</div>
      )}
      {results.length > 0 && (
        <div className="mt-2 max-h-[280px] overflow-y-auto bg-dash-surface rounded-lg border border-white/10 divide-y divide-white/5">
          {results.map(g => (
            <button
              key={g.id}
              onClick={() => addToBacklog(g)}
              disabled={adding === g.id}
              className="w-full flex items-center gap-3 p-2 hover:bg-white/5 transition-colors text-left cursor-pointer disabled:opacity-50"
            >
              {g.capa ? (
                <img src={g.capa} alt="" className="w-10 h-14 rounded object-cover shrink-0" />
              ) : (
                <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center shrink-0"><Library size={16} className="text-dash-muted" /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-xs truncate">{g.nome}</div>
                <div className="text-dash-muted text-[0.6rem] truncate">{g.plataformas?.join(', ')}</div>
              </div>
              <Plus size={16} className="text-accent-cyan shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* RAWG search button */}
      {!searching && query.length >= 2 && RAWG_KEY && !rawgSearched && (
        <button
          onClick={searchRawg}
          disabled={rawgLoading}
          className="mt-2 w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          {rawgLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} strokeWidth={2.5} />}
          {t('backlog.searchRawg')}
        </button>
      )}

      {/* RAWG results */}
      {rawgSearched && (
        <div className="mt-2">
          <div className="text-[0.65em] font-bold uppercase tracking-wider text-accent-purple mb-1 flex items-center gap-1">
            <Globe size={12} /> RAWG
            <span className="text-dash-muted font-normal">({rawgResults.length})</span>
          </div>
          {rawgLoading ? (
            <div className="text-center py-3"><Loader2 size={16} className="animate-spin text-accent-purple mx-auto" /></div>
          ) : rawgResults.length === 0 ? (
            <div className="text-center text-dash-muted text-xs py-3">{t('backlog.rawgNoResults')}</div>
          ) : (
            <div className="max-h-[280px] overflow-y-auto bg-dash-surface rounded-lg border border-accent-purple/20 divide-y divide-white/5">
              {rawgResults.map(g => (
                <button
                  key={g.id}
                  onClick={() => importAndAdd(g)}
                  disabled={adding === g.id}
                  className="w-full flex items-center gap-3 p-2 hover:bg-accent-purple/5 transition-colors text-left cursor-pointer disabled:opacity-50"
                >
                  {g.background_image ? (
                    <img src={g.background_image} alt="" className="w-10 h-14 rounded object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center shrink-0"><Library size={16} className="text-dash-muted" /></div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-xs truncate">{g.name}</div>
                    <div className="text-dash-muted text-[0.6rem] truncate">{g.platforms?.map(p => p.platform?.name).join(', ')}</div>
                  </div>
                  <span className="text-[0.5em] font-black px-1.5 py-0.5 rounded bg-accent-purple/20 text-accent-purple shrink-0">RAWG</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function BacklogBrowser({ backlog, onGameAdded }) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [sort, setSort] = useState('nome')
  const [rouletteGame, setRouletteGame] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showAddGame, setShowAddGame] = useState(false)
  const [groupByPlatform, setGroupByPlatform] = useState(true)

  const platforms = useMemo(() => {
    const set = new Set(backlog.map(g => g.console).filter(Boolean))
    return [...set].sort()
  }, [backlog])

  const genres = useMemo(() => {
    const set = new Set(backlog.map(g => g.genero).filter(Boolean))
    return [...set].sort()
  }, [backlog])

  const filtered = useMemo(() => {
    let list = [...backlog]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(g => g.nome.toLowerCase().includes(q))
    }
    if (platformFilter) {
      list = list.filter(g => g.console === platformFilter)
    }
    if (genreFilter) {
      list = list.filter(g => g.genero === genreFilter)
    }

    switch (sort) {
      case 'nome':
        list.sort((a, b) => a.nome.localeCompare(b.nome))
        break
      case 'console':
        list.sort((a, b) => (a.console || '').localeCompare(b.console || ''))
        break
      case 'hltb-asc':
        list.sort((a, b) => (parseFloat(a.hltb) || 999) - (parseFloat(b.hltb) || 999))
        break
      case 'hltb-desc':
        list.sort((a, b) => (parseFloat(b.hltb) || 0) - (parseFloat(a.hltb) || 0))
        break
    }

    return list
  }, [backlog, search, platformFilter, genreFilter, sort])

  const groupedByPlatform = useMemo(() => {
    const map = new Map()
    for (const g of filtered) {
      const key = g.console || '—'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(g)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [filtered])

  function handleRoulette() {
    if (filtered.length === 0) return
    const idx = Math.floor(Math.random() * filtered.length)
    setRouletteGame(filtered[idx])
  }

  if (!backlog || backlog.length === 0) return null

  const selectCls = 'bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold focus:outline-none focus:border-accent-cyan transition-colors appearance-none cursor-pointer'

  return (
    <div className="mb-8">
      <SectionTitle icon={<Library size={22} strokeWidth={2.5} className="text-accent-gold" />}>
        {t('backlog.title', { count: backlog.length })}
      </SectionTitle>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-muted" strokeWidth={2.5} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('backlog.searchPlaceholder')}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors"
          />
        </div>

        <button
          onClick={() => setShowFilters(f => !f)}
          className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
            showFilters || platformFilter || genreFilter
              ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30'
              : 'text-dash-muted border-white/10 hover:text-white'
          }`}
        >
          <SlidersHorizontal size={14} strokeWidth={2.5} />
          Filtros
          {(platformFilter || genreFilter) && (
            <span className="bg-accent-cyan text-dash-bg text-[0.6em] font-black rounded-full w-4 h-4 flex items-center justify-center">
              {(platformFilter ? 1 : 0) + (genreFilter ? 1 : 0)}
            </span>
          )}
        </button>

        <button
          onClick={handleRoulette}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-colors cursor-pointer"
        >
          <Dices size={14} strokeWidth={2.5} /> {t('backlog.shuffle')}
        </button>

        <button
          onClick={() => setShowAddGame(a => !a)}
          className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
            showAddGame
              ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30'
              : 'text-accent-cyan border-accent-cyan/30 hover:bg-accent-cyan/10'
          }`}
        >
          <Plus size={14} strokeWidth={2.5} /> {t('backlog.addGame')}
        </button>

        <button
          onClick={() => setGroupByPlatform(v => !v)}
          className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
            groupByPlatform
              ? 'bg-accent-purple/15 text-accent-purple border-accent-purple/30'
              : 'text-dash-muted border-white/10 hover:text-white'
          }`}
          title={t('backlog.groupByPlatform')}
        >
          <LayoutGrid size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* quick-add */}
      {showAddGame && <QuickAddBacklog onAdded={() => { setShowAddGame(false); onGameAdded?.() }} />}

      {/* filter row */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-black/20 rounded-xl border border-white/5">
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('backlog.platform')}</label>
            <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className={selectCls}>
              <option value="">{t('common.allFem')}</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('backlog.genre')}</label>
            <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} className={selectCls}>
              <option value="">{t('common.all')}</option>
              {genres.map(g => <option key={g} value={g}>{t('genres.' + g, g)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('backlog.sort')}</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className={selectCls}>
              {SORT_OPTIONS.map(v => <option key={v} value={v}>{t(SORT_LABEL_KEYS[v])}</option>)}
            </select>
          </div>
          {(platformFilter || genreFilter) && (
            <button
              onClick={() => { setPlatformFilter(''); setGenreFilter('') }}
              className="self-end text-[0.65em] font-bold text-accent-danger hover:underline cursor-pointer pb-1.5"
            >
              {t('backlog.clearFilters')}
            </button>
          )}
        </div>
      )}

      {/* roulette result */}
      {rouletteGame && <RouletteResult game={rouletteGame} onClose={() => setRouletteGame(null)} />}

      {/* results count */}
      {search || platformFilter || genreFilter ? (
        <div className="text-xs text-dash-muted font-bold mb-3">
          {t('backlog.resultCount', { count: filtered.length })}
        </div>
      ) : null}

      {/* grid */}
      {groupByPlatform && !platformFilter ? (
        groupedByPlatform.map(([platform, games]) => {
          const s = getConsoleStyle(platform)
          return (
            <Accordion
              key={platform}
              title={`${s.ico} ${s.name || platform}`}
              color={s.col}
              rightText={`${games.length} ${games.length !== 1 ? t('backlogByPlatform.games') : t('backlogByPlatform.game')}`}
            >
              <div className="pt-3">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2 sm:gap-2.5">
                  {games.map(g => <BacklogCard key={g._id || g.nome} game={g} />)}
                </div>
              </div>
            </Accordion>
          )
        })
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2 sm:gap-2.5">
          {filtered.map(g => <BacklogCard key={g._id || g.nome} game={g} />)}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center text-dash-muted py-12 text-sm">
          {t('backlog.emptyFiltered')}
        </div>
      )}
    </div>
  )
}
