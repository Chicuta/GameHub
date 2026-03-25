import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { I } from './Icons'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = [
  { value: 'jogando', label: '\u25B6 Jogando' },
  { value: 'zerado', label: '\u2713 Zerado' },
  { value: 'jogado', label: '\uD83C\uDFC6 Jogado' },
  { value: 'pausado', label: '\u23F8 Pausado' },
  { value: 'backlog', label: '\u25A0 Backlog' },
  { value: 'abandonado', label: '\u2620 Abandonado' },
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

  function reset() { setOpen(false) }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-5 w-full py-3 rounded-xl border-2 border-dashed border-accent-cyan/30 text-accent-cyan font-heading font-black uppercase tracking-wider text-sm hover:bg-accent-cyan/5 hover:border-accent-cyan/50 transition-all cursor-pointer"
      >
        + ADICIONAR JOGO
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
            <I.search /> Buscar
          </button>
          <button
            onClick={() => setTab('manual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${tab === 'manual' ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-dash-muted hover:text-white'}`}
          >
            <I.pen /> Manual
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
          .ilike('nome', `%${query}%`)
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

      toast.success(`${selected.nome} adicionado!`)
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
          placeholder="Buscar jogo no banco... (ex: Elden Ring)"
          autoFocus
          className={`${inputCls} mb-3`}
        />
        {searching && <div className="text-center text-dash-muted text-sm py-4">Buscando...</div>}
        {!searching && query.length >= 2 && results.length === 0 && (
          <div className="text-center text-dash-muted text-sm py-4">
            Nenhum resultado. Tente a aba <button type="button" className="text-accent-cyan hover:underline cursor-pointer" onClick={() => {}}><I.pen /> Manual</button> para adicionar.
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
              {g.igdb_rating && (
                <span className={`text-sm font-bold px-2 py-1 rounded ${g.igdb_rating >= 75 ? 'bg-accent-success/10 text-accent-success' : g.igdb_rating >= 50 ? 'bg-accent-gold/10 text-accent-gold' : 'bg-accent-danger/10 text-accent-danger'}`}>
                  {Math.round(g.igdb_rating)}
                </span>
              )}
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
            {selected.igdb_rating && <> • <I.star className="inline-block align-[-0.125em] text-accent-gold" size="0.85em" /> {Math.round(selected.igdb_rating)}</>}
          </div>
          <div className="text-[0.6rem] text-dash-muted mt-1">{selected.plataformas?.join(', ')}</div>
          {selected.descricao && (
            <p className="text-dash-muted text-xs mt-2 line-clamp-3">{selected.descricao}</p>
          )}
          <button type="button" onClick={() => setSelected(null)} className="text-accent-cyan text-xs mt-2 hover:underline cursor-pointer">← Voltar à busca</button>
        </div>
      </div>
      <CollectionFields form={form} setForm={setForm} platforms={selected.plataformas} />
      <ActionButtons saving={saving} onCancel={onDone} />
    </form>
  )
}

/* ── Formulário Manual ──────────────────────────── */
function ManualForm({ user, onDone }) {
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nome: '', console: '', genero: '', capa: '',
    status: 'jogando', nota: '', tempo: '', hltb: '', anoJogado: '',
  })

  async function handleAdd(e) {
    e.preventDefault()
    if (!supabase || !user) return
    if (!form.nome.trim()) { toast.error('Nome do jogo é obrigatório'); return }
    setSaving(true)
    try {
      const { data: gameRow, error: gameErr } = await supabase
        .from('games')
        .insert({
          nome: form.nome.trim(),
          slug: form.nome.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          capa: form.capa.trim() || null,
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

      toast.success(`${form.nome} adicionado!`)
      onDone()
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar')
    } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleAdd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className={labelCls}>Nome do Jogo *</label>
          <input type="text" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
            placeholder="Ex: Elden Ring" autoFocus className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>URL da Capa (opcional)</label>
          <input type="url" value={form.capa} onChange={e => setForm(f => ({ ...f, capa: e.target.value }))}
            placeholder="https://..." className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className={labelCls}>Plataforma</label>
          <select value={form.console} onChange={e => setForm(f => ({ ...f, console: e.target.value }))} className={inputCls}>
            <option value="">Selecione...</option>
            {PLATFORM_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Gênero</label>
          <select value={form.genero} onChange={e => setForm(f => ({ ...f, genero: e.target.value }))} className={inputCls}>
            <option value="">Selecione...</option>
            {GENRE_LIST.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <CollectionFields form={form} setForm={setForm} />

      {form.capa && (
        <div className="mb-4 flex items-center gap-3">
          <img src={form.capa} alt="preview" className="w-16 h-20 rounded-lg object-cover" onError={e => { e.target.style.display = 'none' }} />
          <span className="text-dash-muted text-xs">Preview da capa</span>
        </div>
      )}

      <ActionButtons saving={saving} onCancel={onDone} />
    </form>
  )
}

/* ── Campos compartilhados ──────────────────────── */
function CollectionFields({ form, setForm, platforms }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div>
        <label className={labelCls}>Status</label>
        <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inputCls}>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      {platforms && (
        <div>
          <label className={labelCls}>Plataforma</label>
          <select value={form.console} onChange={e => setForm(f => ({ ...f, console: e.target.value }))} className={inputCls}>
            <option value="">Selecione...</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className={labelCls}>Nota (1-10)</label>
        <input type="number" min="1" max="10" value={form.nota} onChange={e => setForm(f => ({ ...f, nota: e.target.value }))} placeholder="—" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Horas Jogadas</label>
        <input type="number" min="0" step="0.5" value={form.tempo} onChange={e => setForm(f => ({ ...f, tempo: e.target.value }))} placeholder="0" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>HLTB (horas)</label>
        <input type="number" min="0" step="0.5" value={form.hltb} onChange={e => setForm(f => ({ ...f, hltb: e.target.value }))} placeholder="Estimado" className={inputCls} />
      </div>
      {form.status === 'jogado' && (
        <div>
          <label className={labelCls}>Ano que jogou</label>
          <input type="number" min="1970" max={new Date().getFullYear()} value={form.anoJogado} onChange={e => setForm(f => ({ ...f, anoJogado: e.target.value }))} placeholder={String(new Date().getFullYear())} className={inputCls} />
        </div>
      )}
    </div>
  )
}

function ActionButtons({ saving, onCancel }) {
  return (
    <div className="flex gap-2">
      <button type="submit" disabled={saving}
        className="flex-1 py-2.5 rounded-lg font-heading font-black uppercase tracking-wider text-sm bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all disabled:opacity-50 cursor-pointer">
        {saving ? 'Salvando...' : '+ Adicionar à Coleção'}
      </button>
      <button type="button" onClick={onCancel}
        className="px-4 py-2.5 rounded-lg border border-white/10 text-dash-muted text-sm hover:bg-white/5 transition-colors cursor-pointer">
        Cancelar
      </button>
    </div>
  )
}
