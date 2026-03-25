import { formatTime, parseTime } from '../utils/helpers'
import { CheckCircle2, Clock, Calendar, Flame } from 'lucide-react'

const ico = { size: 14, strokeWidth: 2.5, className: 'inline-block align-[-0.125em] mr-1' }

function StatCard({ label, value, color, subtitle }) {
  return (
    <div className="bg-dash-surface border border-white/5 rounded-xl p-3 text-center">
      <div className="text-[0.6em] font-black uppercase text-dash-muted mb-1 tracking-wider">{label}</div>
      <div className="font-heading text-2xl font-bold" style={{ color }}>{value}</div>
      {subtitle && <div className="text-[0.6em] text-dash-muted mt-1 font-bold">{subtitle}</div>}
    </div>
  )
}

export default function StatsGrid({ zerados, jogando, abandonados = [], backlog = [], pausados = [] }) {
  const allGames = [...zerados, ...jogando, ...abandonados, ...backlog, ...pausados]
  const totalH = allGames.reduce((s, g) => s + parseTime(g.tempo), 0)
  const currentYear = new Date().getFullYear()
  const z2026 = zerados.filter(g => g.ano_zerado === currentYear)
  const totalH2026 = z2026.reduce((s, g) => s + parseTime(g.tempo), 0)
  const notasValidas = zerados.map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0)
  const mediaGlobal = notasValidas.length
    ? (notasValidas.reduce((s, v) => s + v, 0) / notasValidas.length).toFixed(1)
    : '—'
  const mesAtual = new Date().getMonth() + 1
  const ritmo = mesAtual > 0 ? (z2026.length / mesAtual).toFixed(1) : '—'

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
      <StatCard label={<><CheckCircle2 {...ico} /> Zerados</>} value={zerados.length} color="var(--color-accent-cyan)" subtitle={`média ${mediaGlobal} ★`} />
      <StatCard label={<><Clock {...ico} /> Tempo Total</>} value={formatTime(totalH)} color="var(--color-accent-success)" subtitle={totalH2026 > 0 ? `${formatTime(totalH2026)} em ${currentYear}` : undefined} />
      <StatCard label={<><Calendar {...ico} /> {currentYear}</>} value={z2026.length} color="var(--color-accent-gold)" subtitle={`${ritmo} jogos/mês`} />
      <StatCard label={<><Flame {...ico} /> Jogando</>} value={jogando.length} color="var(--color-accent-purple)" subtitle="em andamento" />
    </div>
  )
}
