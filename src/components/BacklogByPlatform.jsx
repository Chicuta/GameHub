import { useMemo } from 'react'
import { getConsoleStyle } from '../utils/helpers'
import SectionTitle from './SectionTitle'
import Accordion from './Accordion'
import { Scale } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function BacklogByPlatform({ backlog }) {
  const { t } = useTranslation()
  const rows = useMemo(() => {
    const stats = {}
    backlog.forEach(t => {
      const key = (t.console || '').toLowerCase()
      if (!stats[key]) stats[key] = { name: t.console, total: 0, done: 0, games: [] }
      stats[key].total++
      stats[key].games.push(t)
      if (t.completed) stats[key].done++
    })
    return Object.values(stats)
      .filter(r => r.total > 0)
      .sort((a, b) => (b.total - b.done) - (a.total - a.done))
  }, [backlog])

  const maxPend = Math.max(...rows.map(r => r.total - r.done), 1)

  if (rows.length === 0) return null

  return (
    <div>
      <SectionTitle icon={<Scale size={22} strokeWidth={2.5} className="text-accent-gold" />}>{t('backlogByPlatform.title')}</SectionTitle>
      {rows.map(r => {
        const pend = r.total - r.done
        const pctZero = r.total > 0 ? Math.round((r.done / r.total) * 100) : 0
        const wPend = Math.round((pend / maxPend) * 100)
        const s = getConsoleStyle(r.name)
        return (
          <Accordion
            key={r.name}
            title={`${s.ico} ${r.name}`}
            color={s.col}
            icon={<Scale size={18} strokeWidth={2.5} />}
            rightText={`${pend} ${pend !== 1 ? t('backlogByPlatform.games') : t('backlogByPlatform.game')}`}
          >
            <div className="pt-3">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex-1 h-2 bg-black/50 rounded overflow-hidden relative">
                  <div className="flex w-full h-full">
                    <div className="h-full rounded-l" style={{ width: `${wPend}%`, background: s.col, opacity: 0.75 }} />
                    <div className="h-full rounded-r" style={{ width: `${100 - wPend}%`, background: s.col, opacity: 0.15 }} />
                  </div>
                </div>
                <div className="text-[0.65em] font-extrabold whitespace-nowrap shrink-0" style={{ color: s.col }}>
                  {pend} {t('backlogByPlatform.pending')} <span className="text-dash-muted font-semibold">({pctZero}%✓)</span>
                </div>
              </div>
              <div className="space-y-1">
                {r.games.map(g => (
                  <div key={g.nome} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-black/20 hover:bg-white/5 transition-colors">
                    {g.capa ? (
                      <img src={g.capa} alt="" className="w-8 h-11 rounded object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-11 rounded bg-white/5 flex items-center justify-center shrink-0 text-dash-muted text-xs">🎮</div>
                    )}
                    <span className="text-sm font-bold text-white truncate">{g.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        )
      })}
    </div>
  )
}
