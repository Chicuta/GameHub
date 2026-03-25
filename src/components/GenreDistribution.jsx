import { useMemo } from 'react'
import Accordion from './Accordion'
import { Dna } from 'lucide-react'

const GENRE_COLORS = {
  'ação': '#ff0055',
  'aventura': '#00f5ff',
  'rpg': '#bc13fe',
  'jrpg': '#9b59b6',
  'fps': '#ff5722',
  'tps': '#ff7043',
  'plataforma': '#00ff9f',
  'metroidvania': '#1abc9c',
  'puzzle': '#ffcc00',
  'estratégia': '#3498db',
  'simulação': '#2ecc71',
  'corrida': '#e67e22',
  'luta': '#e74c3c',
  'terror': '#8e44ad',
  'roguelike': '#f39c12',
  'sandbox': '#27ae60',
  'indie': '#1dd1a1',
  'souls-like': '#636e72',
}

function getGenreColor(genre) {
  const key = (genre || '').toLowerCase()
  return GENRE_COLORS[key] || '#94a3b8'
}

export default function GenreDistribution({ zerados, jogando, abandonados, backlog, pausados }) {
  const rows = useMemo(() => {
    const all = [...zerados, ...jogando, ...abandonados, ...backlog, ...pausados]
    const stats = {}

    for (const g of all) {
      const genre = g.genero || 'Sem gênero'
      if (!stats[genre]) stats[genre] = { name: genre, total: 0, zerados: 0, jogando: 0 }
      stats[genre].total++
    }

    for (const g of zerados) {
      const genre = g.genero || 'Sem gênero'
      if (stats[genre]) stats[genre].zerados++
    }

    for (const g of jogando) {
      const genre = g.genero || 'Sem gênero'
      if (stats[genre]) stats[genre].jogando++
    }

    return Object.values(stats)
      .filter(r => r.total > 0)
      .sort((a, b) => b.total - a.total)
  }, [zerados, jogando, abandonados, backlog, pausados])

  const maxTotal = Math.max(...rows.map(r => r.total), 1)

  if (rows.length === 0) return null

  return (
    <Accordion title="DISTRIBUIÇÃO POR GÊNERO" color="#bc13fe" icon={<Dna size={18} strokeWidth={2.5} />}>
      <div className="pt-3">
        {rows.map(r => {
          const w = Math.round((r.total / maxTotal) * 100)
          const col = getGenreColor(r.name)
          const pctZerado = r.total > 0 ? Math.round((r.zerados / r.total) * 100) : 0
          return (
            <div key={r.name} className="flex items-center gap-2.5 mb-2.5">
              <div className="text-[0.72em] font-bold text-dash-text w-[110px] shrink-0 whitespace-nowrap overflow-hidden text-ellipsis" title={r.name}>
                {r.name}
              </div>
              <div className="flex-1 h-2 bg-black/50 rounded overflow-hidden relative">
                <div className="flex w-full h-full">
                  <div className="h-full rounded-l" style={{ width: `${w}%`, background: col, opacity: 0.75 }} />
                  <div className="h-full rounded-r" style={{ width: `${100 - w}%`, background: col, opacity: 0.1 }} />
                </div>
              </div>
              <div className="text-[0.65em] font-extrabold whitespace-nowrap w-[70px] text-right shrink-0" style={{ color: col }}>
                {r.total} <span className="text-dash-muted font-semibold">({pctZerado}%✓)</span>
              </div>
            </div>
          )
        })}
      </div>
    </Accordion>
  )
}
