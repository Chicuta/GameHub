import { useMemo } from 'react'
import { getConsoleStyle } from '../utils/helpers'
import Accordion from './Accordion'
import { Scale } from 'lucide-react'

export default function BacklogByPlatform({ backlog }) {
  const rows = useMemo(() => {
    const stats = {}
    backlog.forEach(t => {
      const key = (t.console || '').toLowerCase()
      if (!stats[key]) stats[key] = { name: t.console, total: 0, done: 0 }
      stats[key].total++
      if (t.completed) stats[key].done++
    })
    return Object.values(stats)
      .filter(r => r.total > 0)
      .sort((a, b) => (b.total - b.done) - (a.total - a.done))
  }, [backlog])

  const maxPend = Math.max(...rows.map(r => r.total - r.done), 1)

  if (rows.length === 0) return null

  return (
    <Accordion title="BACKLOG POR PLATAFORMA" color="#ffd700" icon={<Scale size={18} strokeWidth={2.5} />}>
      <div className="pt-3">
        {rows.map(r => {
          const pend = r.total - r.done
          const pctZero = r.total > 0 ? Math.round((r.done / r.total) * 100) : 0
          const wPend = Math.round((pend / maxPend) * 100)
          const s = getConsoleStyle(r.name)
          return (
            <div key={r.name} className="flex items-center gap-2.5 mb-2.5">
              <div className="text-[0.72em] font-bold text-dash-text w-[110px] shrink-0 whitespace-nowrap overflow-hidden text-ellipsis" title={r.name}>
                {s.ico} {r.name}
              </div>
              <div className="flex-1 h-2 bg-black/50 rounded overflow-hidden relative">
                <div className="flex w-full h-full">
                  <div className="h-full rounded-l" style={{ width: `${wPend}%`, background: s.col, opacity: 0.75 }} />
                  <div className="h-full rounded-r" style={{ width: `${100 - wPend}%`, background: s.col, opacity: 0.15 }} />
                </div>
              </div>
              <div className="text-[0.65em] font-extrabold whitespace-nowrap w-[60px] text-right shrink-0" style={{ color: s.col }}>
                {pend} <span className="text-dash-muted font-semibold">({pctZero}%✓)</span>
              </div>
            </div>
          )
        })}
      </div>
    </Accordion>
  )
}
