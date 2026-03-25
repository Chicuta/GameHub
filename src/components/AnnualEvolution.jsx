import { useMemo } from 'react'
import { parseTime } from '../utils/helpers'
import Accordion from './Accordion'
import { Sparkles, Rocket, Gem, Swords, BarChart3 } from 'lucide-react'

const icoProps = { size: 16, strokeWidth: 2.5, className: 'inline-block align-[-0.125em]' }

const CONFIGS = [
  { ano: 2023, cor: '#facc15', icon: <Sparkles {...icoProps} /> },
  { ano: 2024, cor: '#818cf8', icon: <Rocket {...icoProps} /> },
  { ano: 2025, cor: '#f472b6', icon: <Gem {...icoProps} /> },
  { ano: 2026, cor: '#22d3ee', icon: <Swords {...icoProps} /> },
]

export default function AnnualEvolution({ zerados }) {
  const dados = useMemo(() => {
    return CONFIGS.map(c => {
      const gs = zerados.filter(g => g.ano_zerado === c.ano)
      const notas = gs.map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0)
      const media = notas.length ? (notas.reduce((s, v) => s + v, 0) / notas.length).toFixed(1) : null
      return { ...c, count: gs.length, media }
    }).filter(d => d.count > 0).reverse()
  }, [zerados])

  if (!dados.length) return null
  const maxCount = Math.max(...dados.map(d => d.count), 1)

  return (
    <Accordion title="EVOLUÇÃO ANUAL" color="#818cf8" icon={<BarChart3 size={18} strokeWidth={2.5} />}>
      <div className="pt-3 space-y-3">
        {dados.map(d => {
          const w = Math.round((d.count / maxCount) * 100)
          return (
            <div key={d.ano} className="flex items-center gap-2.5">
              <div className="font-heading font-black text-[0.9em] w-10 shrink-0" style={{ color: d.cor }}>
                {d.icon} {d.ano}
              </div>
              <div className="flex-1 h-[22px] bg-black/40 rounded overflow-hidden relative">
                <div
                  className="h-full rounded flex items-center pl-2 transition-all duration-500"
                  style={{ width: `${w}%`, background: `linear-gradient(90deg, ${d.cor}, ${d.cor}99)` }}
                >
                  <span className="font-heading font-black text-[0.85em] text-[#0d0d12] whitespace-nowrap">{d.count} jogos</span>
                </div>
              </div>
              <div className="text-[0.65em] font-extrabold w-13 shrink-0 text-right whitespace-nowrap" style={{ color: d.cor }}>
                {d.media != null ? `${d.media} ★` : '—'}
              </div>
            </div>
          )
        })}
      </div>
    </Accordion>
  )
}
