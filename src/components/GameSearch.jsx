import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { isSafeImageUrl, escapeIlike } from '../utils/helpers'
import { I } from './Icons'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = [
  { value: 'jogando', labelKey: 'status.playingIcon' },
  { value: 'zerado', labelKey: 'status.completedIcon' },
  { value: 'jogado', labelKey: 'status.playedIcon' },
  { value: 'pausado', labelKey: 'status.pausedIcon' },
  { value: 'backlog', labelKey: 'status.backlogIcon' },
  { value: 'abandonado', labelKey: 'status.abandonedIcon' },
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

const GENRE_LIST = [
  'Ação', 'Aventura', 'RPG', 'JRPG', 'Souls-like',
  'FPS', 'TPS', 'Plataforma', 'Metroidvania',
  'Puzzle', 'Estratégia', 'Simulação', 'Corrida',
  'Esporte', 'Luta', 'Terror', 'Roguelike',
  'Sandbox', 'Mundo Aberto', 'Visual Novel', 'Indie', 'Outro',
]

const inputCls = 'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-cyan transition-colors'
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-dash-muted mb-1'

export default function GameSearch({ onGameAdded }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('search')
  const { user } = useAuth()
  const { t } = useTranslation()

  function reset() { setOpen(false) }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-5 w-full py-3 rounded-xl border-2 border-dashed border-accent-cyan/30 text-accent-cyan font-heading font-black uppercase tracking-wider text-sm hover:bg-accent-cyan/5 hover:border-accent-cyan/50 transition-all cursor-pointer"
      >
        {t('gameSearch.addGame')}
      </button>
    )
  }

  return (
    <div className="mb-5 bg-dash-surface rounded-xl border border-dash-border p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          <button
            onClick={() => setTab('search')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${tab === 'search' ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-dash-muted hover:text-white'}`}
          >
            <I.search /> {t('gameSearch.tabSearch')}
          </button>
          <button
            onClick={() => setTab('manual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${tab === 'manual' ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-dash-muted hover:text-white'}`}
          >
            <I.pen /> {t('gameSearch.tabManual')}
          </button>
        </div>
        <button onClick={reset} className="text-dash-muted hover:text-white text-xl px-2 cursor-pointer">✕</button>
      </div>

      {tab === 'search' ? (
        <LocalSearch user={user} onDone={() => { reset(); onGameAdded?.() }} />
      ) : (
        <ManualForm user={user} onDone={() => { reset(); onGameAdded?.() }} />
      )}
    </div>
  )
}

/* ── Busca Local (Supabase) ─────────────────────── */
function LocalSearch({ user, onDone }) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ status: 'jogando', nota: '', tempo: '', console: '', hltb: '', anoJogado: '' })
  const [saving, setSaving] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim() || query.length < 2) { setResults([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .ilike('nome', `%${escapeIlike(query)}%`)
          .order('igdb_rating', { ascending: false, nullsFirst: false })
          .limit(20)
        if (error) throw error
        setResults(data || [])
      } catch { toast.error('Erro ao buscar jogos') }
      finally { setSearching(false) }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  function selectGame(game) {
    setSelected(game)
    setForm({
      status: 'jogando', nota: '', tempo: '', anoJogado: '',
      console: game.plataformas?.[0] || '',
      hltb: game.hltb_main ? String(game.hltb_main) : '',
    })
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!supabase || !user || !selected) return
    setSaving(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const year = new Date().getFullYear()
      const isZerado = form.status === 'zerado' || form.status === 'jogado'
      const dbStatus = form.status === 'jogado' ? 'zerado' : form.status
      const { error: ugErr } = await supabase.from('user_games').upsert({
        user_id: user.id,
        game_id: selected.id,
        status: dbStatus,
        console: form.console || null,
        nota: form.nota ? parseInt(form.nota) : null,
        tempo: form.tempo ? parseFloat(form.tempo) : 0,
        hltb: form.hltb ? parseFloat(form.hltb) : null,
        data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
        data_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? `${form.anoJogado}-01-01` : today) : null,
        ano_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? parseInt(form.anoJogado) : year) : null,
        ano_abandonado: form.status === 'abandonado' ? year : null,
      }, { onConflict: 'user_id,game_id' })
      if (ugErr) throw ugErr

      toast.success(t('gameSearch.addedToast', { name: selected.nome }))
      onDone()
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar')
    } finally { setSaving(false) }
  }

  if (!selected) {
    return (
      <>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('gameSearch.searchPlaceholder')}
          autoFocus
          className={`${inputCls} mb-3`}
        />
        {searching && <div className="text-center text-dash-muted text-sm py-4">{t('common.searching')}</div>}
        {!searching && query.length >= 2 && results.length === 0 && (
          <div className="text-center text-dash-muted text-sm py-4">
            {t('gameSearch.noResults')}
          </div>
        )}
        <div className="max-h-[400px] overflow-y-auto space-y-1.5">
          {results.map(g => (
            <button
              key={g.id}
              onClick={() => selectGame(g)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              {g.capa ? (
                <img src={g.capa} alt="" className="w-12 h-16 rounded object-cover shrink-0" />
              ) : (
                <div className="w-12 h-16 rounded bg-white/5 flex items-center justify-center text-xl shrink-0 text-accent-cyan"><I.gamepad /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">{g.nome}</div>
                <div className="text-dash-muted text-xs mt-0.5">
                  {g.data_lancamento?.substring(0, 4) || '???'}
                  {g.generos?.length > 0 && ` • ${g.generos.slice(0, 2).join(', ')}`}
                </div>
                <div className="text-[0.6rem] text-dash-muted mt-0.5 truncate">{g.plataformas?.join(', ')}</div>
              </div>
              {(() => { const r = g.igdb_rating ? Math.round(g.igdb_rating) : g.metacritic ? g.metacritic : g.rawg_rating ? Math.round(g.rawg_rating * 20) : null; return r ? (
                <span className={`text-sm font-bold px-2 py-1 rounded ${r >= 75 ? 'bg-accent-success/10 text-accent-success' : r >= 50 ? 'bg-accent-gold/10 text-accent-gold' : 'bg-accent-danger/10 text-accent-danger'}`}>
                  {r}
                </span>
              ) : null })()}
            </button>
          ))}
        </div>
      </>
    )
  }

  return (
    <form onSubmit={handleAdd}>
      <div className="flex gap-4 mb-4">
        {selected.capa ? (
          <img src={selected.capa} alt="" className="w-24 h-32 rounded-lg object-cover shrink-0" />
        ) : (
          <div className="w-24 h-32 rounded-lg bg-white/5 flex items-center justify-center text-3xl shrink-0 text-accent-cyan"><I.gamepad /></div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-black text-lg">{selected.nome}</h3>
          <div className="text-dash-muted text-xs mt-1">
            {selected.data_lancamento?.substring(0, 4)} • {selected.generos?.join(', ')}
            {(() => { const r = selected.igdb_rating ? Math.round(selected.igdb_rating) : selected.metacritic ? selected.metacritic : selected.rawg_rating ? Math.round(selected.rawg_rating * 20) : null; return r ? <> • <I.star className="inline-block align-[-0.125em] text-accent-gold" size="0.85em" /> {r}</> : null })()}
          </div>
          <div className="text-[0.6rem] text-dash-muted mt-1">{selected.plataformas?.join(', ')}</div>
          {selected.descricao && (
            <p className="text-dash-muted text-xs mt-2 line-clamp-3">{selected.descricao}</p>
          )}
          <button type="button" onClick={() => setSelected(null)} className="text-accent-cyan text-xs mt-2 hover:underline cursor-pointer">{t('gameSearch.backToSearch')}</button>
        </div>
      </div>
      <CollectionFields form={form} setForm={setForm} platforms={selected.plataformas} />
      <ActionButtons saving={saving} onCancel={onDone} />
    </form>
  )
}

/* ── Formulário Manual ──────────────────────────── */
function ManualForm({ user, onDone }) {
  const { t } = useTranslation()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nome: '', console: '', genero: '', capa: '',
    status: 'jogando', nota: '', tempo: '', hltb: '', anoJogado: '',
  })

  async function handleAdd(e) {
    e.preventDefault()
    if (!supabase || !user) return
    if (!form.nome.trim()) { toast.error(t('gameSearch.gameRequired')); return }
    setSaving(true)
    try {
      const capaUrl = form.capa.trim() || null
      if (capaUrl && !isSafeImageUrl(capaUrl)) {
        toast.error('URL da capa inválida — use https://')
        setSaving(false)
        return
      }
      const { data: gameRow, error: gameErr } = await supabase
        .from('games')
        .insert({
          nome: form.nome.trim(),
          slug: form.nome.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          capa: capaUrl,
          generos: form.genero ? [form.genero] : [],
          plataformas: form.console ? [form.console] : [],
        })
        .select('id')
        .single()
      if (gameErr) throw gameErr

      const today = new Date().toISOString().split('T')[0]
      const year = new Date().getFullYear()
      const isZerado = form.status === 'zerado' || form.status === 'jogado'
      const dbStatus = form.status === 'jogado' ? 'zerado' : form.status
      const { error: ugErr } = await supabase.from('user_games').insert({
        user_id: user.id,
        game_id: gameRow.id,
        status: dbStatus,
        console: form.console || null,
        nota: form.nota ? parseInt(form.nota) : null,
        tempo: form.tempo ? parseFloat(form.tempo) : 0,
        hltb: form.hltb ? parseFloat(form.hltb) : null,
        data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
        data_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? `${form.anoJogado}-01-01` : today) : null,
        ano_zerado: isZerado ? (form.status === 'jogado' && form.anoJogado ? parseInt(form.anoJogado) : year) : null,
        ano_abandonado: form.status === 'abandonado' ? year : null,
      })
      if (ugErr) throw ugErr

      toast.success(t('gameSearch.addedToast', { name: form.nome }))
      onDone()
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar')
    } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleAdd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className={labelCls}>{t('gameSearch.gameName')}</label>
          <input type="text" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
            placeholder={t('gameSearch.gameNamePlaceholder')} autoFocus className={inputCls} maxLength={200} />
        </div>
        <div>
          <label className={labelCls}>{t('gameSearch.coverUrl')}</label>
          <input type="url" value={form.capa} onChange={e => setForm(f => ({ ...f, capa: e.target.value }))}
            placeholder={t('gameSearch.coverUrlPlaceholder')} className={inputCls} maxLength={1000} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className={labelCls}>{t('gameSearch.platform')}</label>
          <select value={form.console} onChange={e => setForm(f => ({ ...f, console: e.target.value }))} className={inputCls}>
            <option value="">{t('common.select')}</option>
            {PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>{t('gameSearch.genre')}</label>
          <select value={form.genero} onChange={e => setForm(f => ({ ...f, genero: e.target.value }))} className={inputCls}>
            <option value="">{t('common.select')}</option>
            {GENRE_LIST.map(g => <option key={g} value={g}>{t('genres.' + g)}</option>)}
          </select>
        </div>
      </div>

      <CollectionFields form={form} setForm={setForm} />

      {form.capa && isSafeImageUrl(form.capa) && (
        <div className="mb-4 flex items-center gap-3">
          <img src={form.capa} alt="preview" className="w-16 h-20 rounded-lg object-cover" onError={e => { e.target.style.display = 'none' }} />
          <span className="text-dash-muted text-xs">{t('gameSearch.coverPreview')}</span>
        </div>
      )}

      <ActionButtons saving={saving} onCancel={onDone} />
    </form>
  )
}

/* ── Campos compartilhados ──────────────────────── */
function CollectionFields({ form, setForm, platforms }) {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div>
        <label className={labelCls}>{t('gameSearch.status')}</label>
        <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inputCls}>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
        </select>
      </div>
      {platforms && (
        <div>
          <label className={labelCls}>{t('gameSearch.platform')}</label>
          <select value={form.console} onChange={e => setForm(f => ({ ...f, console: e.target.value }))} className={inputCls}>
            <option value="">{t('common.select')}</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className={labelCls}>{t('gameSearch.rating')}</label>
        <input type="number" min="1" max="10" value={form.nota} onChange={e => setForm(f => ({ ...f, nota: e.target.value }))} placeholder="—" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>{t('gameSearch.hoursPlayed')}</label>
        <input type="number" min="0" step="0.5" value={form.tempo} onChange={e => setForm(f => ({ ...f, tempo: e.target.value }))} placeholder="0" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>{t('gameSearch.hltbHours')}</label>
        <input type="number" min="0" step="0.5" value={form.hltb} onChange={e => setForm(f => ({ ...f, hltb: e.target.value }))} placeholder="Estimado" className={inputCls} />
      </div>
      {form.status === 'jogado' && (
        <div>
          <label className={labelCls}>{t('gameSearch.yearPlayed')}</label>
          <input type="number" min="1970" max={new Date().getFullYear()} value={form.anoJogado} onChange={e => setForm(f => ({ ...f, anoJogado: e.target.value }))} placeholder={String(new Date().getFullYear())} className={inputCls} />
        </div>
      )}
    </div>
  )
}

function ActionButtons({ saving, onCancel }) {
  const { t } = useTranslation()
  return (
    <div className="flex gap-2">
      <button type="submit" disabled={saving}
        className="flex-1 py-2.5 rounded-lg font-heading font-black uppercase tracking-wider text-sm bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all disabled:opacity-50 cursor-pointer">
        {saving ? 'Salvando...' : t('gameSearch.addToCollection')}
      </button>
      <button type="button" onClick={onCancel}
        className="px-4 py-2.5 rounded-lg border border-white/10 text-dash-muted text-sm hover:bg-white/5 transition-colors cursor-pointer">
        Cancelar
      </button>
    </div>
  )
}
