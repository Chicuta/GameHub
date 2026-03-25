import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parseTime, formatTime } from '../utils/helpers'
import { Clock } from 'lucide-react'

/**
 * Enhanced HLTB progress bar with tooltip showing remaining hours.
 * Variants: 'card' (compact, for list cards), 'detail' (larger, for modals), 'mini' (backlog badge)
 */
export default function HltbBar({ tempo, hltb, consoleColor, variant = 'card' }) {
  const { t } = useTranslation()
  const [hover, setHover] = useState(false)
  const played = parseTime(tempo)
  const h = parseFloat(hltb) || 0
  if (h <= 0 && t <= 0) return null

  const p = h > 0 ? Math.min((played / h) * 100, 100) : 0
  const pRound = Math.round(p)
  const restante = h > 0 ? Math.max(h - played, 0) : 0
  const over = h > 0 && played > h

  const barColor = over
    ? '#ff0055'
    : p >= 80
      ? '#00ff9f'
      : p >= 50
        ? consoleColor || '#00f5ff'
        : p >= 20
          ? `${consoleColor || '#00f5ff'}cc`
          : `${consoleColor || '#00f5ff'}88`

  const grad = over
    ? 'linear-gradient(90deg, #ff0055, #ff4488)'
    : `linear-gradient(90deg, ${barColor}, ${barColor}99)`

  if (variant === 'mini') {
    if (h <= 0) return null
    return (
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pRound}%`, background: grad }} />
          </div>
          <span className="text-[0.5em] font-black text-dash-muted whitespace-nowrap">{h}h</span>
        </div>

        {hover && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 rounded-lg bg-black/95 border border-white/10 text-[0.6em] font-bold whitespace-nowrap z-30 pointer-events-none shadow-xl">
            <div className="text-white">{formatTime(played)} / {h}h</div>
            {restante > 0 && <div className="text-accent-cyan">{t('hltbBar.remaining', { time: formatTime(restante) })}</div>}
            {over && <div className="text-accent-danger">+{formatTime(played - h)} {t('hltbBar.overHltb')}</div>}
          </div>
        )}
      </div>
    )
  }

  // card variant (default)
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-between text-[0.65em] font-extrabold mb-1">
        <span style={{ color: barColor }}>{pRound}%{over ? ' ⚠️' : ''}</span>
        <span className="text-dash-muted">
          {formatTime(played)}{h > 0 ? ` / ${h}h` : ''}
        </span>
      </div>
      <div className="h-2 bg-black/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 relative"
          style={{ width: `${Math.min(pRound, 100)}%`, background: grad }}
        >
          {pRound >= 15 && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shine-swipe"
                style={{ width: '30%' }}
              />
            </div>
          )}
        </div>
      </div>

      {hover && h > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 rounded-lg bg-black/95 border border-white/10 text-[0.6em] font-bold whitespace-nowrap z-30 pointer-events-none shadow-xl">
          {restante > 0 ? (
            <div className="flex items-center gap-1 text-accent-cyan">
              <Clock size={10} strokeWidth={2.5} /> {t('hltbBar.remaining', { time: formatTime(restante) })}
            </div>
          ) : over ? (
            <div className="text-accent-danger">+{formatTime(played - h)} {t('hltbBar.overHltb')}</div>
          ) : (
            <div className="text-accent-success">{t('hltbBar.reached')}</div>
          )}
        </div>
      )}
    </div>
  )
}
