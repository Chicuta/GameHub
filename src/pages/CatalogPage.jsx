import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useUserGames } from '../contexts/UserGamesContext'
import { Search, SlidersHorizontal, BookOpen, Gamepad2, Star, X, Globe, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionTitle from '../components/SectionTitle'

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY

const STATUS_OPTIONS = [
  { value: 'jogando', label: '▶ Jogando' },
  { value: 'zerado', label: '✓ Zerado' },
  { value: 'jogado', label: '🏆 Jogado' },
  { value: 'pausado', label: '⏸ Pausado' },
  { value: 'backlog', label: '■ Backlog' },
  { value: 'abandonado', label: '☠ Abandonado' },
]

const PLATFORM_LIST = [
  'PC', 'Steam Deck',
  'PS5', 'PS4', 'PS3', 'PS2', 'PS1',
  'Xbox Series X/S', 'Xbox One', 'Xbox 360',
  'Switch', 'Wii U', 'Wii', '3DS', 'DS', 'N64',
  'SNES', 'NES', 'Game Boy', 'Game Boy Advance',
  'Sega Saturn', 'Mega Drive', 'Dreamcast', 'Game Gear', 'Master System', 'Sega CD',
  'Neo Geo', 'Arcade',
  'PC Engine', 'PSP',
  'Mobile', 'Outro',
]

const inputCls = 'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors'
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-dash-muted mb-1'

/** Retorna a melhor nota disponível normalizada para escala 0-100 */
function getGameRating(game) {
  if (game.igdb_rating) return Math.round(game.igdb_rating)
  if (game.metacritic) return game.metacritic
  if (game.rawg_rating) return Math.round(game.rawg_rating * 20)
  return null
}

export default function CatalogPage() {
  const { t } = useTranslation()
  const [allGames, setAllGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [rawgResults, setRawgResults] = useState([])
  const [rawgLoading, setRawgLoading] = useState(false)
  const [rawgSearched, setRawgSearched] = useState(false)
  const [collapsedGenres, setCollapsedGenres] = useState(new Set())

  function toggleGenre(genre) {
    setCollapsedGenres(prev => {
      const next = new Set(prev)
      if (next.has(genre)) next.delete(genre)
      else next.add(genre)
      return next
    })
  }

  // Fetch all games from DB
  useEffect(() => {
    async function fetchAll() {
      if (!supabase) return
      setLoading(true)
      const { data, error } = await supabase
        .from('games')
        .select('id, nome, capa, generos, plataformas, metacritic, rawg_rating, igdb_rating, data_lancamento, descricao, hltb_main')
        .not('capa', 'is', null)
        .order('nome')
      if (error) {
        console.error('fetchCatalog:', error)
        setAllGames([])
      } else {
        setAllGames(data || [])
      }
      setLoading(false)
    }
    fetchAll()
  }, [])

  // Extract unique genres
  const allGenres = useMemo(() => {
    const set = new Set()
    allGames.forEach(g => g.generos?.forEach(genre => set.add(genre)))
    return [...set].sort()
  }, [allGames])

  // Filter games
  const filtered = useMemo(() => {
    let list = allGames

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(g => g.nome.toLowerCase().includes(q))
    }

    if (genreFilter) {
      list = list.filter(g => g.generos?.includes(genreFilter))
    }

    return list
  }, [allGames, search, genreFilter])

  // Group by genre
  const groupedByGenre = useMemo(() => {
    if (genreFilter) {
      return [{ genre: genreFilter, games: filtered }]
    }

    const map = new Map()
    filtered.forEach(game => {
      const genres = game.generos?.length > 0 ? game.generos : [t('common.noGenre', 'Sem Gênero')]
      genres.forEach(genre => {
        if (!map.has(genre)) map.set(genre, [])
        map.get(genre).push(game)
      })
    })

    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([genre, games]) => ({ genre, games }))
  }, [filtered, genreFilter])

  const selectCls = 'bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold focus:outline-none focus:border-accent-cyan transition-colors appearance-none cursor-pointer'

  // ── RAWG live search ────────────────────────────────
  const searchRawg = useCallback(async () => {
    if (!search.trim() || !RAWG_KEY) return
    setRawgLoading(true)
    setRawgSearched(true)
    try {
      const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(search.trim())}&page_size=20`)
      if (!res.ok) throw new Error('RAWG request failed')
      const data = await res.json()
      // Filter out games already in local catalog (by rawg_id or by matching name)
      const localNames = new Set(allGames.map(g => g.nome.toLowerCase()))
      const results = (data.results || []).filter(g =>
        !allGames.some(lg => lg.rawg_id === g.id) && !localNames.has(g.name.toLowerCase())
      )
      setRawgResults(results)
    } catch (err) {
      console.error('RAWG search error:', err)
      toast.error(t('catalog.importError'))
      setRawgResults([])
    } finally {
      setRawgLoading(false)
    }
  }, [search, allGames])

  // Import a RAWG game into local DB
  async function importRawgGame(rawgGame) {
    if (!supabase) return null
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

    const { data, error } = await supabase
      .from('games')
      .upsert(row, { onConflict: 'rawg_id' })
      .select()
      .single()

    if (error) {
      console.error('Import RAWG game error:', error)
      toast.error(t('catalog.importError'))
      return null
    }

    // Add to local state
    setAllGames(prev => [...prev, data])
    setRawgResults(prev => prev.filter(g => g.id !== rawgGame.id))
    toast.success(t('catalog.importedToast', { name: rawgGame.name }))
    return data
  }

  // Reset RAWG results when search changes
  useEffect(() => {
    setRawgResults([])
    setRawgSearched(false)
  }, [search])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-dash-bg/80 backdrop-blur-xl rounded-2xl border border-dash-border p-5">
        <SectionTitle icon={<BookOpen size={22} strokeWidth={2.5} className="text-accent-cyan" />}>
          {t('catalog.title', { count: allGames.length })}
        </SectionTitle>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-muted" strokeWidth={2.5} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              showFilters || genreFilter
                ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30'
                : 'text-dash-muted border-white/10 hover:text-white'
            }`}
          >
            <SlidersHorizontal size={14} strokeWidth={2.5} />
            {t('common.filters')}
            {genreFilter && (
              <span className="bg-accent-cyan text-dash-bg text-[0.6em] font-black rounded-full w-4 h-4 flex items-center justify-center">1</span>
            )}
          </button>

          {/* RAWG search button */}
          {search.trim().length >= 2 && RAWG_KEY && (
            <button
              onClick={searchRawg}
              disabled={rawgLoading}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              {rawgLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} strokeWidth={2.5} />}
              {t('catalog.searchRawg')}
            </button>
          )}
        </div>

        {/* Filter row */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-black/20 rounded-xl border border-white/5">
            <div>
              <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">{t('catalog.genre')}</label>
              <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} className={selectCls}>
                <option value="">{t('common.all')}</option>
                {allGenres.map(g => <option key={g} value={g}>{t(`genres.${g}`, g)}</option>)}
              </select>
            </div>
            {genreFilter && (
              <button
                onClick={() => setGenreFilter('')}
                className="self-end text-accent-cyan text-xs hover:underline cursor-pointer mb-1"
              >
                {t('catalog.clearFilter')}
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-dash-muted">
            <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">{t('catalog.noGames')}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedByGenre.map(({ genre, games }) => {
              const collapsed = collapsedGenres.has(genre)
              return (
                <div key={genre}>
                  <button
                    onClick={() => toggleGenre(genre)}
                    className="font-heading font-black text-white uppercase tracking-wider text-sm mb-3 flex items-center gap-2 cursor-pointer hover:text-accent-cyan transition-colors group/genre"
                  >
                    <span className={`transition-transform duration-200 ${collapsed ? '-rotate-90' : ''}`}>▾</span>
                    <span className="text-accent-cyan">#</span> {t(`genres.${genre}`, genre)}
                    <span className="text-dash-muted text-xs font-normal">({games.length})</span>
                  </button>
                  {!collapsed && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                      {games.map(game => (
                        <CatalogCard key={`${genre}-${game.id}`} game={game} onClick={() => setSelectedGame(game)} />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* RAWG results */}
        {rawgSearched && (
          <div className="mt-8 border-t border-white/5 pt-6">
            <h3 className="font-heading font-black text-white uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
              <Globe size={18} className="text-accent-purple" />
              {t('catalog.rawgResults')}
              <span className="text-dash-muted text-xs font-normal">({t('catalog.newGames', { count: rawgResults.length })})</span>
            </h3>
            {rawgLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-accent-purple" />
              </div>
            ) : rawgResults.length === 0 ? (
              <p className="text-dash-muted text-sm text-center py-6">{t('catalog.noRawgResults', { search })}</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {rawgResults.map(game => (
                  <RawgCard key={game.id} game={game} onImport={importRawgGame} onSelect={setSelectedGame} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {selectedGame && (
        <CatalogModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  )
}

/* ── RAWG Card ────────────────────────────────────── */
function RawgCard({ game, onImport, onSelect }) {
  const [importing, setImporting] = useState(false)

  async function handleClick() {
    setImporting(true)
    const imported = await onImport(game)
    setImporting(false)
    if (imported) onSelect(imported)
  }

  return (
    <button
      onClick={handleClick}
      disabled={importing}
      className="bg-dash-surface rounded-lg border border-accent-purple/20 overflow-hidden flex flex-col h-[180px] sm:h-[220px] transition-all duration-300 hover:scale-[1.03] hover:border-accent-purple hover:shadow-[0_0_12px_rgba(168,85,247,0.15)] cursor-pointer group text-left w-full disabled:opacity-50 relative"
    >
      {importing && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <Loader2 size={20} className="animate-spin text-accent-purple" />
        </div>
      )}
      <div className="relative flex-1 w-full bg-black overflow-hidden">
        {game.background_image ? (
          <img src={game.background_image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><Gamepad2 size={28} className="text-dash-muted" /></div>
        )}
        {game.metacritic && (
          <span className={`absolute top-1.5 right-1.5 text-[0.6em] font-black px-1.5 py-0.5 rounded ${
            game.metacritic >= 75 ? 'bg-accent-success/90 text-white' :
            game.metacritic >= 50 ? 'bg-accent-gold/90 text-dash-bg' :
            'bg-accent-danger/90 text-white'
          }`}>
            {game.metacritic}
          </span>
        )}
        <span className="absolute top-1.5 left-1.5 text-[0.55em] font-black px-1.5 py-0.5 rounded bg-accent-purple/90 text-white">RAWG</span>
      </div>
      <div className="px-2 py-1.5 bg-black/60 border-t border-accent-purple/20">
        <div className="font-black text-[0.7em] text-white truncate">{game.name}</div>
        <div className="text-[0.55em] text-dash-muted truncate">{game.genres?.map(g => g.name).slice(0, 2).join(', ')}</div>
      </div>
    </button>
  )
}

/* ── Card ─────────────────────────────────────────── */
function CatalogCard({ game, onClick }) {
  const rating = getGameRating(game)
  return (
    <button
      onClick={onClick}
      className="bg-dash-surface rounded-lg border border-white/5 overflow-hidden flex flex-col h-[180px] sm:h-[220px] transition-all duration-300 hover:scale-[1.03] hover:border-accent-cyan hover:shadow-[0_0_12px_rgba(0,245,255,0.15)] cursor-pointer group text-left w-full"
    >
      <div className="relative flex-1 w-full bg-black overflow-hidden">
        {game.capa ? (
          <img src={game.capa} alt={game.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><Gamepad2 size={28} className="text-dash-muted" /></div>
        )}
        {rating && (
          <span className={`absolute top-1.5 right-1.5 text-[0.6em] font-black px-1.5 py-0.5 rounded ${
            rating >= 75 ? 'bg-accent-success/90 text-white' :
            rating >= 50 ? 'bg-accent-gold/90 text-dash-bg' :
            'bg-accent-danger/90 text-white'
          }`}>
            {rating}
          </span>
        )}
      </div>
      <div className="px-2 py-1.5 bg-black/60 border-t border-white/5">
        <div className="font-black text-[0.7em] text-white truncate">{game.nome}</div>
        <div className="text-[0.55em] text-dash-muted truncate">{game.generos?.slice(0, 2).join(', ')}</div>
      </div>
    </button>
  )
}

/* ── Modal ────────────────────────────────────────── */
function CatalogModal({ game, onClose }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { reload } = useUserGames()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    status: 'jogando', nota: '', tempo: '', anoJogado: '',
    console: game.plataformas?.[0] || '',
  })
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!supabase || !user) {
      toast.error(t('catalog.loginRequired'))
      return
    }
    setSaving(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const year = new Date().getFullYear()
      const isZerado = form.status === 'zerado' || form.status === 'jogado'
      const dbStatus = form.status === 'jogado' ? 'zerado' : form.status
      const { error } = await supabase.from('user_games').upsert({
        user_id: user.id,
        game_id: game.id,
        status: dbStatus,
        console: form.console || null,
        nota: form.nota ? parseInt(form.nota) : null,
        tempo: form.tempo ? parseFloat(form.tempo) : 0,
        hltb: game.hltb_main ? parseFloat(game.hltb_main) : null,
        data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
        data_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? `${form.anoJogado}-01-01` : today) : null,
        ano_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? parseInt(form.anoJogado) : year) : null,
        ano_abandonado: form.status === 'abandonado' ? year : null,
      }, { onConflict: 'user_id,game_id' })
      if (error) throw error
      toast.success(t('catalog.addedToast', { name: game.nome }))
      reload?.()
      onClose()
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-dash-surface border border-dash-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 text-dash-muted hover:text-white cursor-pointer z-10">
          <X size={20} />
        </button>

        {/* Game Info */}
        <div className="flex gap-4 mb-4">
          {game.capa ? (
            <img src={game.capa} alt="" className="w-28 h-36 rounded-lg object-cover shrink-0" />
          ) : (
            <div className="w-28 h-36 rounded-lg bg-white/5 flex items-center justify-center text-3xl shrink-0 text-accent-cyan">
              <Gamepad2 size={36} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-black text-lg leading-tight">{game.nome}</h3>
            <div className="text-dash-muted text-xs mt-1.5">
              {game.data_lancamento?.substring(0, 4)} • {game.generos?.join(', ')}
            </div>
            {(() => { const r = getGameRating(game); return r ? (
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={14} className="text-accent-gold" strokeWidth={2.5} />
                <span className={`text-sm font-bold ${
                  r >= 75 ? 'text-accent-success' :
                  r >= 50 ? 'text-accent-gold' :
                  'text-accent-danger'
                }`}>
                  {r}
                </span>
              </div>
            ) : null })()}
            <div className="text-[0.65rem] text-dash-muted mt-1.5 line-clamp-2">{game.plataformas?.join(', ')}</div>
            {game.hltb_main > 0 && (
              <div className="flex items-center gap-1 mt-1.5 text-xs text-dash-muted">
                <span className="font-bold text-accent-cyan">HLTB</span> {game.hltb_main}h
              </div>
            )}
            {game.descricao && (
              <p className="text-dash-muted text-xs mt-2 line-clamp-3">{game.descricao}</p>
            )}
          </div>
        </div>

        {/* Add to Hub button */}
        {!showForm ? (
          <button
            onClick={() => {
              if (!user) {
                toast.error(t('catalog.loginRequiredHub'))
                return
              }
              setShowForm(true)
            }}
            className="w-full py-3 rounded-xl border-2 border-dashed border-accent-cyan/30 text-accent-cyan font-heading font-black uppercase tracking-wider text-sm hover:bg-accent-cyan/5 hover:border-accent-cyan/50 transition-all cursor-pointer"
          >
            {t('catalog.addToHub')}
          </button>
        ) : (
          <form onSubmit={handleAdd} className="border-t border-white/5 pt-4 mt-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className={labelCls}>Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inputCls}>
                  {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Plataforma</label>
                <select value={form.console} onChange={e => setForm(f => ({ ...f, console: e.target.value }))} className={inputCls}>
                  <option value="">Selecione...</option>
                  {game.plataformas?.length > 0
                    ? game.plataformas.map(p => <option key={p} value={p}>{p}</option>)
                    : PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)
                  }
                </select>
              </div>
              <div>
                <label className={labelCls}>Nota (1-10)</label>
                <input type="number" min="1" max="10" value={form.nota} onChange={e => setForm(f => ({ ...f, nota: e.target.value }))} placeholder="—" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Horas Jogadas</label>
                <input type="number" min="0" step="0.5" value={form.tempo} onChange={e => setForm(f => ({ ...f, tempo: e.target.value }))} placeholder="0" className={inputCls} />
              </div>
              {form.status === 'jogado' && (
                <div>
                  <label className={labelCls}>Ano que jogou</label>
                  <input type="number" min="1970" max={new Date().getFullYear()} value={form.anoJogado} onChange={e => setForm(f => ({ ...f, anoJogado: e.target.value }))} placeholder={String(new Date().getFullYear())} className={inputCls} />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="flex-1 py-2.5 rounded-lg font-heading font-black uppercase tracking-wider text-sm bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all disabled:opacity-50 cursor-pointer">
                {saving ? t('common.saving', 'Salvando...') : t('catalog.addToCollection')}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-lg border border-white/10 text-dash-muted text-sm hover:bg-white/5 transition-colors cursor-pointer">
                {t('common.cancel', 'Cancelar')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
