import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { isSafeImageUrl, escapeIlike } from '../utils/helpers'
import { I } from './Icons'
import toast from 'react-hot-toast'

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY

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
  const [form, setForm] = useState({ status: 'jogando', nota: '', tempo: '', console: '', anoJogado: '' })
  const [saving, setSaving] = useState(false)
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
          .limit(20)
        if (error) throw error
        setResults(data || [])
      } catch { toast.error('Erro ao buscar jogos') }
      finally { setSearching(false) }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  async function searchRawg() {
    if (!query.trim() || !RAWG_KEY) return
    setRawgLoading(true); setRawgSearched(true)
    try {
      const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(query.trim())}&page_size=15`)
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

  async function importRawgGame(rawgGame) {
    if (!supabase) return
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
      .from('games').upsert(row, { onConflict: 'rawg_id' }).select().single()
    if (error) { toast.error(t('catalog.importError')); return null }
    setRawgResults(prev => prev.filter(g => g.id !== rawgGame.id))
    toast.success(t('gameSearch.importedToast', { name: data.nome }))
    return data
  }

  function selectGame(game) {
    setSelected(game)
    setForm({
      status: 'jogando', nota: '', tempo: '', anoJogado: '',
      console: game.plataformas?.[0] || '',
    })
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!supabase || !user || !selected) return
    setSaving(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const year = new Date().getFullYear()
      const isFinished = form.status === 'zerado' || form.status === 'jogado'
      const { error: ugErr } = await supabase.from('user_games').upsert({
        user_id: user.id,
        game_id: selected.id,
        status: form.status,
        console: form.console || null,
        nota: form.nota ? parseInt(form.nota) : null,
        tempo: form.tempo ? parseFloat(form.tempo) : 0,
        hltb: selected.hltb_main ? parseFloat(selected.hltb_main) : null,
        data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
        data_zerado: isFinished ? (form.anoJogado ? `${form.anoJogado}-01-01` : today) : null,
        ano_zerado: isFinished ? (form.anoJogado ? parseInt(form.anoJogado) : year) : null,
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
        {!searching && query.length >= 2 && results.length === 0 && !rawgSearched && (
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

        {/* RAWG search button */}
        {!searching && query.length >= 2 && RAWG_KEY && !rawgSearched && (
          <button
            onClick={searchRawg}
            disabled={rawgLoading}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2.5 rounded-lg border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            {rawgLoading ? <I.loader className="animate-spin" size="1em" /> : <I.globe size="1em" />}
            {t('gameSearch.searchRawg')}
          </button>
        )}

        {/* RAWG results */}
        {rawgSearched && (
          <div className="mt-3 border-t border-accent-purple/20 pt-3">
            <div className="text-[0.7em] font-bold uppercase tracking-wider text-accent-purple mb-2 flex items-center gap-1.5">
              <I.globe size="1em" /> RAWG
              <span className="text-dash-muted font-normal">({rawgResults.length})</span>
            </div>
            {rawgLoading ? (
              <div className="text-center py-4"><I.loader className="animate-spin text-accent-purple mx-auto" size="1.2em" /></div>
            ) : rawgResults.length === 0 ? (
              <div className="text-center text-dash-muted text-sm py-4">{t('gameSearch.rawgNoResults')}</div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto space-y-1.5">
                {rawgResults.map(g => (
                  <button
                    key={g.id}
                    onClick={async () => {
                      const imported = await importRawgGame(g)
                      if (imported) selectGame(imported)
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent-purple/5 transition-colors text-left cursor-pointer"
                  >
                    {g.background_image ? (
                      <img src={g.background_image} alt="" className="w-12 h-16 rounded object-cover shrink-0" />
                    ) : (
                      <div className="w-12 h-16 rounded bg-white/5 flex items-center justify-center text-xl shrink-0 text-accent-purple"><I.gamepad /></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm truncate">{g.name}</div>
                      <div className="text-dash-muted text-xs mt-0.5">
                        {g.released?.substring(0, 4) || '???'}
                        {g.genres?.length > 0 && ` • ${g.genres.slice(0, 2).map(x => x.name).join(', ')}`}
                      </div>
                      <div className="text-[0.6rem] text-dash-muted mt-0.5 truncate">{g.platforms?.map(p => p.platform?.name).join(', ')}</div>
                    </div>
                    <span className="text-[0.55em] font-black px-1.5 py-0.5 rounded bg-accent-purple/20 text-accent-purple shrink-0">RAWG</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
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
          {selected.hltb_main > 0 && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-dash-muted">
              <span className="font-bold text-accent-cyan">HLTB</span> {selected.hltb_main}h
            </div>
          )}
          <button type="button" onClick={() => setSelected(null)} className="text-accent-cyan text-xs mt-2 hover:underline cursor-pointer">{t('gameSearch.backToSearch')}</button>
        </div>
      </div>
      <CollectionFields form={form} setForm={setForm} platforms={selected.plataformas} showHltb={false} />
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
  const [customConsole, setCustomConsole] = useState('')
  const [customGenero, setCustomGenero] = useState('')

  const resolvedConsole = form.console === 'Outro' ? customConsole.trim() : form.console
  const resolvedGenero = form.genero === 'Outro' ? customGenero.trim() : form.genero

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
          generos: resolvedGenero ? [resolvedGenero] : [],
          plataformas: resolvedConsole ? [resolvedConsole] : [],
        })
        .select('id')
        .single()
      if (gameErr) throw gameErr

      const today = new Date().toISOString().split('T')[0]
      const year = new Date().getFullYear()
      const isFinished = form.status === 'zerado' || form.status === 'jogado'
      const { error: ugErr } = await supabase.from('user_games').insert({
        user_id: user.id,
        game_id: gameRow.id,
        status: form.status,
        console: resolvedConsole || null,
        nota: form.nota ? parseInt(form.nota) : null,
        tempo: form.tempo ? parseFloat(form.tempo) : 0,
        hltb: form.hltb ? parseFloat(form.hltb) : null,
        data_inicio: (form.status === 'jogando' || form.status === 'pausado') ? today : null,
        data_zerado: isFinished ? (form.anoJogado ? `${form.anoJogado}-01-01` : today) : null,
        ano_zerado: isFinished ? (form.anoJogado ? parseInt(form.anoJogado) : year) : null,
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
          <select value={form.console} onChange={e => { setForm(f => ({ ...f, console: e.target.value })); if (e.target.value !== 'Outro') setCustomConsole('') }} className={inputCls}>
            <option value="">{t('common.select')}</option>
            {PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {form.console === 'Outro' && (
            <input type="text" value={customConsole} onChange={e => setCustomConsole(e.target.value)}
              placeholder={t('gameSearch.customPlatform')} className={inputCls + ' mt-2'} maxLength={100} autoFocus />
          )}
        </div>
        <div>
          <label className={labelCls}>{t('gameSearch.genre')}</label>
          <select value={form.genero} onChange={e => { setForm(f => ({ ...f, genero: e.target.value })); if (e.target.value !== 'Outro') setCustomGenero('') }} className={inputCls}>
            <option value="">{t('common.select')}</option>
            {GENRE_LIST.map(g => <option key={g} value={g}>{t('genres.' + g)}</option>)}
          </select>
          {form.genero === 'Outro' && (
            <input type="text" value={customGenero} onChange={e => setCustomGenero(e.target.value)}
              placeholder={t('gameSearch.customGenre')} className={inputCls + ' mt-2'} maxLength={100} />
          )}
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
function CollectionFields({ form, setForm, platforms, showHltb = true }) {
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
        <input type="number" min="0" step="0.01" value={form.tempo} onChange={e => setForm(f => ({ ...f, tempo: e.target.value }))} placeholder="0" className={inputCls} />
      </div>
      {showHltb && (
        <div>
          <label className={labelCls}>{t('gameSearch.hltbHours')}</label>
          <input type="number" min="0" step="0.01" value={form.hltb} onChange={e => setForm(f => ({ ...f, hltb: e.target.value }))} placeholder="Estimado" className={inputCls} />
        </div>
      )}
      {(form.status === 'jogado' || form.status === 'zerado') && (
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
