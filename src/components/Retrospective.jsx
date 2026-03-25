import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parseTime, formatTime } from '../utils/helpers'
import ConsoleBadge from './ConsoleBadge'
import SectionTitle from './SectionTitle'
import Accordion from './Accordion'
import { Swords, Gem, Rocket, Sparkles, Gamepad2, Dna, Star, Clock, Calendar } from 'lucide-react'

const icoProps = { size: 16, strokeWidth: 2.5, className: 'inline-block align-[-0.125em]' }

const SEASONS = [
  { ano: 2026, c: '#22d3ee', icon: <Swords {...icoProps} /> },
  { ano: 2025, c: '#f472b6', icon: <Gem {...icoProps} /> },
  { ano: 2024, c: '#818cf8', icon: <Rocket {...icoProps} /> },
  { ano: 2023, c: '#facc15', icon: <Sparkles {...icoProps} /> },
]

function MiniAccordion({ title, icon, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-black/25 rounded-lg border border-white/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-3.5 py-2 text-[0.72em] font-black uppercase tracking-wider text-accent-cyan cursor-pointer hover:bg-accent-cyan/5 transition-colors"
      >
        {icon} {title}
        <span className={`ml-auto text-[0.85em] text-dash-muted transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>▸</span>
      </button>
      {open && <div className="px-3.5 pb-2.5 text-[0.68em] leading-relaxed border-t border-white/5">{children}</div>}
    </div>
  )
}

function RetroCard({ game }) {
  return (
    <div className="flex bg-dash-surface rounded-xl border border-white/5 overflow-hidden h-[110px] transition-all duration-300 hover:scale-[1.02] hover:border-accent-cyan hover:shadow-[0_0_10px_rgba(0,245,255,0.15)]">
      <img src={game.capa} alt={game.nome} className="w-[73px] h-[110px] object-cover shrink-0" />
      <div className="p-2.5 flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="font-black text-[0.85em] text-white whitespace-nowrap overflow-hidden text-ellipsis">{game.nome}</div>
          <ConsoleBadge console={game.console} />
        </div>
        <div className="flex justify-between items-center gap-1.5">
          <span className="text-[0.65em] text-dash-muted font-bold flex items-center gap-0.5"><Clock size={11} strokeWidth={2.5} /> {formatTime(parseTime(game.tempo))}</span>
          <span className="font-black text-[0.8em] px-1.5 py-0.5 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/25 whitespace-nowrap">
            {game.nota != null ? `${game.nota}/10 ★` : '— ★'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Retrospective({ zerados }) {
  const { t } = useTranslation()
  return (
    <div className="mb-8">
      <SectionTitle icon={<Calendar size={22} strokeWidth={2.5} className="text-accent-cyan" />}>{t('retrospective.title')}</SectionTitle>
      {SEASONS.map(s => {
        const gAno = zerados.filter(g => g.ano_zerado === s.ano).sort((a, b) => (b.nota || 0) - (a.nota || 0))
        if (gAno.length === 0) return null
        const hA = gAno.reduce((sum, g) => sum + parseTime(g.tempo), 0)

        const stC = {}, stG = {}, stN = {}
        gAno.forEach(g => {
          if (g.console) stC[g.console] = (stC[g.console] || 0) + 1
          if (g.genero) stG[g.genero] = (stG[g.genero] || 0) + 1
          if (g.nota) stN[String(g.nota)] = (stN[String(g.nota)] || 0) + 1
        })

        return (
          <Accordion
            key={s.ano}
            title={<span className="flex items-center gap-1">{s.icon} {s.ano}</span>}
            color={s.c}
            borderColor={s.c}
            rightText={`${gAno.length} ${t('retrospective.games')} • ${formatTime(hA)}`}
          >
            <div className="pt-3">
              <div className="flex flex-col gap-1.5 mb-4">
                <MiniAccordion title={t('retrospective.consoles')} icon={<Gamepad2 size={14} strokeWidth={2.5} />}>
                  {Object.entries(stC).sort((a, b) => b[1] - a[1]).map(([n, v]) => (
                    <div key={n} className="flex justify-between text-dash-muted"><span>{n}</span><b className="text-white">{v}</b></div>
                  ))}
                </MiniAccordion>
                <MiniAccordion title={t('retrospective.genres')} icon={<Dna size={14} strokeWidth={2.5} />}>
                  {Object.entries(stG).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([n, v]) => (
                    <div key={n} className="flex justify-between text-dash-muted"><span>{t('genres.' + n, n)}</span><b className="text-white">{v}</b></div>
                  ))}
                </MiniAccordion>
                <MiniAccordion title={t('retrospective.ratings')} icon={<Star size={14} strokeWidth={2.5} />}>
                  {Object.entries(stN).sort((a, b) => Number(b[0]) - Number(a[0])).map(([n, v]) => (
                    <div key={n} className="flex justify-between text-dash-muted"><span>{t('retrospective.ratingN', { n })}</span><b className="text-white">{v} {t('retrospective.gamesCount')}</b></div>
                  ))}
                </MiniAccordion>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gAno.map(g => <RetroCard key={g.nome} game={g} />)}
              </div>
            </div>
          </Accordion>
        )
      })}
    </div>
  )
}
