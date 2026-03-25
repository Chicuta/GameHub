import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parseTime, formatTime } from '../utils/helpers'
import SectionTitle from './SectionTitle'
import Accordion from './Accordion'
import { TrendingUp, Star, Dna, Gamepad2, BarChart3, List, CheckCircle2, Play, Skull, Clock, Pencil, Trash2, X, Save, CalendarDays, Search } from 'lucide-react'
import toast from 'react-hot-toast'

function MiniBar({ width, color }) {
  return (
    <div className="h-1.5 bg-black/50 rounded mt-1 overflow-hidden">
      <div className="h-full rounded" style={{ width: `${width}%`, background: color }} />
    </div>
  )
}

function NotesHistogram({ zerados }) {
  const dist = useMemo(() => {
    const d = {}
    for (let i = 1; i <= 10; i++) d[i] = 0
    zerados.forEach(g => {
      const n = Math.round(Number(g.nota))
      if (n >= 1 && n <= 10) d[n]++
    })
    return d
  }, [zerados])

  const maxVal = Math.max(...Object.values(dist), 1)
  const cores = { 1:'#ff0055', 2:'#ff2255', 3:'#ff5500', 4:'#ff8800', 5:'#ffcc00', 6:'#ccff00', 7:'#00ff9f', 8:'#00f5ff', 9:'#bc13fe', 10:'#ffcc00' }

  return (
    <div className="grid grid-cols-10 gap-1.5 items-end h-[120px] mb-2">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
        const pct = Math.round((dist[n] / maxVal) * 100)
        const cor = cores[n]
        return (
          <div key={n} className="flex flex-col items-center gap-1 h-full justify-end" title={`Nota ${n}: ${dist[n]} jogo${dist[n] !== 1 ? 's' : ''}`}>
            <span className="font-heading font-black text-[0.75em] text-dash-text">{dist[n] || ''}</span>
            <div
              className="w-full rounded-t min-h-1 transition-opacity hover:opacity-75"
              style={{
                height: `${pct}%`,
                background: cor,
                ...(n === 10 ? { boxShadow: `0 0 8px ${cor}60`, border: `1px solid ${cor}60` } : {}),
              }}
            />
            <span className="text-[0.6em] font-extrabold text-dash-muted uppercase tracking-wider">{n}</span>
          </div>
        )
      })}
    </div>
  )
}

function BarChart({ entries, color }) {
  const max = entries.length > 0 ? entries[0][1] : 1
  return entries.map(([name, count]) => {
    const w = (count / max) * 100
    return (
      <div key={name} className="mb-2.5">
        <div className="flex justify-between text-[0.75em] font-bold mb-1">
          <span>{name}</span>
          <span style={{ color }}>{count}</span>
        </div>
        <MiniBar width={w} color={color} />
      </div>
    )
  })
}

const STATUS_STYLE = {
  zerado: { label: 'Zerado', color: '#00ff9f', icon: <CheckCircle2 size={14} strokeWidth={2.5} /> },
  jogando: { label: 'Jogando', color: '#00f5ff', icon: <Play size={14} strokeWidth={2.5} /> },
  pausado: { label: 'Pausado', color: '#bc13fe', icon: <Clock size={14} strokeWidth={2.5} /> },
  abandonado: { label: 'Abandonado', color: '#ff0055', icon: <Skull size={14} strokeWidth={2.5} /> },
  backlog: { label: 'Backlog', color: '#ffcc00', icon: <Clock size={14} strokeWidth={2.5} /> },
}

const STATUS_OPTIONS = [
  { value: 'jogando', label: '▶ Jogando' },
  { value: 'zerado', label: '✓ Zerado' },
  { value: 'jogado', label: '🏆 Jogado' },
  { value: 'pausado', label: '⏸ Pausado' },
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

function EditForm({ game, onSave, onCancel, onDelete }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    status: game._status || 'jogando',
    nota: game.nota ?? '',
    tempo: game.tempo || '',
    console: game.console || '',
    hltb: game.hltb || '',
    anoZerado: game.ano_zerado ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const isZerado = form.status === 'zerado' || form.status === 'jogado'

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const today = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()
    const dbStatus = form.status === 'jogado' ? 'zerado' : form.status
    const anoZ = isZerado ? (form.anoZerado ? parseInt(form.anoZerado) : year) : null
    const fields = {
      status: dbStatus,
      console: form.console || null,
      nota: form.nota ? parseInt(form.nota) : null,
      tempo: form.tempo ? parseFloat(form.tempo) : 0,
      hltb: form.hltb ? parseFloat(form.hltb) : null,
      data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
      data_zerado: isZerado ? (form.anoZerado ? `${form.anoZerado}-01-01` : today) : null,
      ano_zerado: anoZ,
      ano_abandonado: form.status === 'abandonado' ? year : null,
    }
    await onSave(game._id, fields)
    setSaving(false)
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setSaving(true)
    await onDelete(game._id)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/30 rounded-lg p-3 border border-white/10 mt-1">
      <div className="flex items-center gap-3 mb-3">
        {game.capa ? (
          <img src={game.capa} alt="" className="w-10 h-14 rounded object-cover shrink-0" />
        ) : (
          <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center shrink-0 text-accent-cyan"><Gamepad2 size={18} /></div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm truncate">{game.nome}</div>
          {game.genero && <div className="text-[0.6rem] text-dash-muted">{game.genero}</div>}
        </div>
        <button type="button" onClick={onCancel} className="text-dash-muted hover:text-white p-1 cursor-pointer"><X size={16} /></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
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
            {PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Nota (1-10)</label>
          <input type="number" min="1" max="10" value={form.nota} onChange={e => setForm(f => ({ ...f, nota: e.target.value }))} placeholder="—" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Horas Jogadas</label>
          <input type="number" min="0" step="0.01" value={form.tempo} onChange={e => setForm(f => ({ ...f, tempo: e.target.value }))} placeholder="0" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>HLTB (horas)</label>
          <input type="number" min="0" step="0.01" value={form.hltb} onChange={e => setForm(f => ({ ...f, hltb: e.target.value }))} placeholder="—" className={inputCls} />
        </div>
        {isZerado && (
          <div>
            <label className={labelCls}>{t('globalAnalysis.yearCompleted')}</label>
            <input type="number" min="1970" max={new Date().getFullYear()} value={form.anoZerado} onChange={e => setForm(f => ({ ...f, anoZerado: e.target.value }))} placeholder={String(new Date().getFullYear())} className={inputCls} />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-heading font-black uppercase tracking-wider text-xs bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all disabled:opacity-50 cursor-pointer">
          <Save size={14} /> {saving ? '...' : t('common.save')}
        </button>
        <button type="button" onClick={handleDelete} disabled={saving}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 ${confirmDelete ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'border border-white/10 text-dash-muted hover:text-red-400 hover:border-red-500/30'}`}>
          <Trash2 size={14} /> {confirmDelete ? '?' : t('common.delete')}
        </button>
      </div>
    </form>
  )
}

function GameList({ allGames, updateGame, removeGame, reload }) {
  const { t } = useTranslation()
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return allGames
    const q = search.toLowerCase()
    return allGames.filter(g => g.nome.toLowerCase().includes(q))
  }, [allGames, search])

  if (allGames.length === 0) return <p className="text-dash-muted text-sm py-4 text-center">{t('globalAnalysis.noGamesYet')}</p>

  async function handleSave(id, fields) {
    const err = await updateGame(id, fields)
    if (err) { toast.error(err.message || 'Erro ao salvar'); return }
    toast.success(t('globalAnalysis.updatedToast'))
    setEditingId(null)
  }

  async function handleDelete(id) {
    const err = await removeGame(id)
    if (err) { toast.error(err.message || 'Erro ao excluir'); return }
    toast.success(t('globalAnalysis.removedToast'))
    setEditingId(null)
  }

  return (
    <div className="pt-3">
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('globalAnalysis.searchPlaceholder')}
          className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors"
        />
      </div>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-dash-muted text-sm py-4 text-center">{t('globalAnalysis.noGamesFound')}</p>
        )}
        {filtered.map((g, i) => {
        const st = STATUS_STYLE[g._status] || STATUS_STYLE.backlog

        if (editingId === g._id) {
          return <EditForm key={g._id} game={g} onSave={handleSave} onCancel={() => setEditingId(null)} onDelete={handleDelete} />
        }

        return (
          <div key={g._id || `${g.nome}-${i}`} className="flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-white/5 transition-colors group">
            {g.capa ? (
              <img src={g.capa} alt="" className="w-10 h-14 rounded object-cover shrink-0" />
            ) : (
              <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center text-lg shrink-0 text-accent-cyan"><Gamepad2 size={18} /></div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm truncate">{g.nome}</div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-[0.65rem] font-bold uppercase" style={{ color: st.color }}>
                  {st.icon} {t('status.' + g._status)}
                </span>
                {g.console && <span className="text-[0.6rem] text-dash-muted">• {g.console}</span>}
                {g.genero && <span className="text-[0.6rem] text-dash-muted">• {g.genero}</span>}
                {g.tempo > 0 && <span className="text-[0.6rem] text-dash-muted">• {g.tempo}h</span>}
              </div>
            </div>
            {g.nota && <span className="text-accent-gold font-bold text-sm mr-1">{g.nota} ★</span>}
            {g._id && (
              <button
                onClick={() => setEditingId(g._id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-dash-muted hover:text-accent-cyan hover:bg-white/5 transition-all cursor-pointer"
                title="Editar jogo"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

function YearByYear({ allGames }) {
  const { t } = useTranslation()
  const yearData = useMemo(() => {
    const map = {}
    allGames.forEach(g => {
      const year = g.ano_zerado || g.ano_abandonado || null
      if (!year) return
      if (!map[year]) map[year] = { total: 0, zerados: 0, horas: 0, notas: [], generos: {} }
      const d = map[year]
      d.total++
      if (g._status === 'zerado') d.zerados++
      d.horas += parseTime(g.tempo)
      if (g.nota) d.notas.push(Number(g.nota))
      if (g.genero) d.generos[g.genero] = (d.generos[g.genero] || 0) + 1
    })
    return Object.entries(map)
      .map(([year, d]) => ({
        year: Number(year),
        ...d,
        media: d.notas.length > 0 ? (d.notas.reduce((a, b) => a + b, 0) / d.notas.length).toFixed(1) : null,
        topGenero: Object.entries(d.generos).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
      }))
      .sort((a, b) => b.year - a.year)
  }, [allGames])

  if (yearData.length === 0) return null

  const maxGames = Math.max(...yearData.map(y => y.total), 1)

  return yearData.map(y => (
    <Accordion
      key={y.year}
      title={`${y.year}`}
      color="#f472b6"
      icon={<CalendarDays size={18} strokeWidth={2.5} />}
      rightText={`${y.total} jogo${y.total !== 1 ? 's' : ''}`}
    >
      <div className="pt-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          <div className="bg-black/30 rounded-lg p-2.5 text-center">
            <div className="text-[0.55rem] font-bold uppercase text-dash-muted tracking-wider mb-0.5">{t('globalAnalysis.games')}</div>
            <div className="font-heading font-black text-lg text-accent-cyan">{y.total}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2.5 text-center">
            <div className="text-[0.55rem] font-bold uppercase text-dash-muted tracking-wider mb-0.5">{t('globalAnalysis.completed')}</div>
            <div className="font-heading font-black text-lg text-accent-success">{y.zerados}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2.5 text-center">
            <div className="text-[0.55rem] font-bold uppercase text-dash-muted tracking-wider mb-0.5">{t('globalAnalysis.hours')}</div>
            <div className="font-heading font-black text-lg text-accent-purple">{formatTime(y.horas)}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2.5 text-center">
            <div className="text-[0.55rem] font-bold uppercase text-dash-muted tracking-wider mb-0.5">{t('globalAnalysis.avgRating')}</div>
            <div className="font-heading font-black text-lg text-accent-gold">{y.media ?? '—'} {y.media ? '★' : ''}</div>
          </div>
        </div>
        {y.topGenero && (
          <div className="text-[0.7rem] text-dash-muted mb-2">
            {t('globalAnalysis.topGenre')}: <span className="text-accent-purple font-bold">{t('genres.' + y.topGenero, y.topGenero)}</span>
          </div>
        )}
        <MiniBar width={(y.total / maxGames) * 100} color="#f472b6" />
      </div>
    </Accordion>
  ))
}

export default function GlobalAnalysis({ zerados, jogando = [], abandonados = [], pausados = [], updateGame, removeGame, reload }) {
  const { t } = useTranslation()
  const allGames = useMemo(() => [
    ...zerados.map(g => ({ ...g, _status: 'zerado' })),
    ...jogando.map(g => ({ ...g, _status: 'jogando' })),
    ...abandonados.map(g => ({ ...g, _status: 'abandonado' })),
    ...pausados.map(g => ({ ...g, _status: 'pausado' })),
  ], [zerados, jogando, abandonados, pausados])

  const gamesWithNota = useMemo(() => allGames.filter(g => g.nota), [allGames])

  const { genS, conS, conAvg } = useMemo(() => {
    const g = {}, c = {}, ca = {}
    allGames.forEach(p => {
      if (p.genero) g[p.genero] = (g[p.genero] || 0) + 1
      if (p.console) c[p.console] = (c[p.console] || 0) + 1
      if (p.console && p.nota) {
        const n = Number(p.nota)
        if (!isNaN(n)) {
          ca[p.console] = ca[p.console] || { s: 0, c: 0 }
          ca[p.console].s += n
          ca[p.console].c++
        }
      }
    })
    return { genS: g, conS: c, conAvg: ca }
  }, [allGames])

  const genEntries = Object.entries(genS).sort((a, b) => b[1] - a[1])
  const conEntries = Object.entries(conS).sort((a, b) => b[1] - a[1])
  const avgEntries = Object.entries(conAvg)
    .map(([k, v]) => [k, (v.s / v.c).toFixed(1)])
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="mb-8">
      <SectionTitle icon={<TrendingUp size={22} strokeWidth={2.5} className="text-accent-cyan" />}>{t('globalAnalysis.title')}</SectionTitle>

      <Accordion title={t('globalAnalysis.myGames', { count: allGames.length })} color="#00f5ff" icon={<List size={18} strokeWidth={2.5} />}>
        <GameList allGames={allGames} updateGame={updateGame} removeGame={removeGame} reload={reload} />
      </Accordion>

      <Accordion title={t('globalAnalysis.ratingDist')} color="#ffcc00" icon={<Star size={18} strokeWidth={2.5} />}>
        <div className="pt-3">
          <NotesHistogram zerados={gamesWithNota} />
        </div>
      </Accordion>

      <Accordion title={t('globalAnalysis.genres')} color="#bc13fe" icon={<Dna size={18} strokeWidth={2.5} />}>
        <div className="pt-3">
          <BarChart entries={genEntries.map(([name, count]) => [t('genres.' + name, name), count])} color="#bc13fe" />
        </div>
      </Accordion>

      <Accordion title={t('globalAnalysis.platforms')} color="#0072ff" icon={<Gamepad2 size={18} strokeWidth={2.5} />}>
        <div className="pt-3">
          <BarChart entries={conEntries} color="#0072ff" />
        </div>
      </Accordion>

      <Accordion title={t('globalAnalysis.avgByConsole')} color="#34d399" icon={<BarChart3 size={18} strokeWidth={2.5} />}>
        <div className="pt-3">
          {avgEntries.map(([name, val]) => {
            const w = (val / 10) * 100
            return (
              <div key={name} className="mb-2.5">
                <div className="flex justify-between text-[0.75em] font-bold mb-1">
                  <span>{name}</span>
                  <span className="text-amber-300">{val} ★</span>
                </div>
                <MiniBar width={w} color="#34d399" />
              </div>
            )
          })}
        </div>
      </Accordion>

      <YearByYear allGames={allGames} />
    </div>
  )
}
