import { Zap } from 'lucide-react'

export default function XpBar({ zerados }) {
  const xpCap = Math.max(10, Math.ceil(zerados.length / 5) * 10)
  const xpPercent = Math.min(100, Math.round((zerados.length / xpCap) * 100))
  const level = Math.floor(zerados.length / 5)

  return (
    <div className="bg-dash-surface p-3 rounded-xl border border-dash-border mb-5">
      <div className="flex justify-between mb-1.5 font-heading font-bold text-sm uppercase">
        <span><Zap size={14} strokeWidth={2.5} className="inline-block align-[-0.125em] mr-1 text-accent-gold" /> NÍVEL {level}</span>
        <span className="text-accent-cyan">{xpPercent}%</span>
      </div>
      <div className="h-2 bg-black/60 rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple shadow-[0_0_8px_var(--color-accent-cyan)] transition-all duration-500"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </div>
  )
}
