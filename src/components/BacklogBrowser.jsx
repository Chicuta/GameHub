import { useState, useMemo } from 'react'
import { getConsoleStyle, parseTime } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import { Library, Search, Filter, SlidersHorizontal, Dices, ChevronDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'nome', label: 'Nome' },
  { value: 'console', label: 'Plataforma' },
  { value: 'hltb-asc', label: 'HLTB ↑' },
  { value: 'hltb-desc', label: 'HLTB ↓' },
]

function BacklogCard({ game }) {
  const { openGame } = useGameDetail()
  const h = parseFloat(game.hltb) || 0
  const s = getConsoleStyle(game.console)

  return (
    <div
      onClick={() => openGame({ ...game, _status: 'backlog' })}
      className="bg-dash-surface rounded-lg border border-white/5 overflow-hidden flex flex-col h-[220px] transition-all duration-300 hover:scale-[1.03] hover:border-accent-gold hover:shadow-[0_0_12px_rgba(255,204,0,0.15)] cursor-pointer group"
    >
      <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
        {game.capa ? (
          <img src={game.capa} alt={game.nome} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <Library size={28} className="text-dash-muted" />
        )}
        {h > 0 && (
          <span className="absolute top-1.5 right-1.5 text-[0.55em] font-black bg-black/70 text-dash-muted px-1.5 py-0.5 rounded border border-white/10">
            {h}h
          </span>
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
        <div className="text-[0.65em] font-bold uppercase tracking-wider text-accent-gold mb-1">🎲 Jogo Sorteado!</div>
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

export default function BacklogBrowser({ backlog }) {
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [sort, setSort] = useState('nome')
  const [rouletteGame, setRouletteGame] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

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
        BACKLOG ({backlog.length})
      </SectionTitle>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-muted" strokeWidth={2.5} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar no backlog..."
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
          <Dices size={14} strokeWidth={2.5} /> Sortear
        </button>
      </div>

      {/* filter row */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-black/20 rounded-xl border border-white/5">
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">Plataforma</label>
            <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className={selectCls}>
              <option value="">Todas</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">Gênero</label>
            <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} className={selectCls}>
              <option value="">Todos</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[0.6em] font-bold uppercase text-dash-muted mb-1">Ordenar</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className={selectCls}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {(platformFilter || genreFilter) && (
            <button
              onClick={() => { setPlatformFilter(''); setGenreFilter('') }}
              className="self-end text-[0.65em] font-bold text-accent-danger hover:underline cursor-pointer pb-1.5"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* roulette result */}
      {rouletteGame && <RouletteResult game={rouletteGame} onClose={() => setRouletteGame(null)} />}

      {/* results count */}
      {search || platformFilter || genreFilter ? (
        <div className="text-xs text-dash-muted font-bold mb-3">
          {filtered.length} jogo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>
      ) : null}

      {/* grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5">
        {filtered.map(g => <BacklogCard key={g._id || g.nome} game={g} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-dash-muted py-12 text-sm">
          Nenhum jogo encontrado com os filtros atuais.
        </div>
      )}
    </div>
  )
}
