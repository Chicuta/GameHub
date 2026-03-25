import { useMemo } from 'react'
import { parseTime, formatTime } from '../utils/helpers'
import Accordion from './Accordion'
import { HeartPulse, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Skull } from 'lucide-react'

function HealthGauge({ score, label, color }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center border-4"
        style={{ borderColor: color, boxShadow: `0 0 16px ${color}30` }}
      >
        <span className="font-heading text-2xl font-black" style={{ color }}>{score}</span>
      </div>
      <span className="text-[0.65em] font-black uppercase tracking-wider" style={{ color }}>{label}</span>
    </div>
  )
}

function MetricRow({ icon, label, value, sub, color }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/30 border border-white/5 shrink-0" style={{ color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[0.75em] font-bold text-white">{label}</div>
        {sub && <div className="text-[0.6em] text-dash-muted font-bold">{sub}</div>}
      </div>
      <div className="text-sm font-black shrink-0" style={{ color }}>{value}</div>
    </div>
  )
}

export default function BacklogHealth({ zerados, jogando, backlog, pausados, abandonados }) {
  const stats = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const z2026 = zerados.filter(g => g.ano_zerado === currentYear)
    const ritmoMensal = currentMonth > 0 ? z2026.length / currentMonth : 0

    const pendentes = backlog.length + pausados.length + jogando.length
    const total = pendentes + zerados.length + abandonados.length

    // Meses para zerar todo backlog no ritmo atual
    const mesesParaZerar = ritmoMensal > 0 ? Math.ceil(pendentes / ritmoMensal) : Infinity
    const anosParaZerar = mesesParaZerar / 12

    // Backlog HLTB total
    const hltbPendente = [...backlog, ...pausados, ...jogando].reduce((s, g) => s + (parseFloat(g.hltb) || 0), 0)

    // Taxa de conclusão geral
    const taxaConclusao = total > 0 ? Math.round((zerados.length / total) * 100) : 0

    // Ratio adicionados vs zerados (este ano)
    // Score: 100 = ótimo, 0 = crítico
    let score
    if (pendentes === 0) score = 100
    else if (ritmoMensal === 0) score = 10
    else if (anosParaZerar <= 1) score = 90
    else if (anosParaZerar <= 2) score = 70
    else if (anosParaZerar <= 5) score = 50
    else if (anosParaZerar <= 10) score = 30
    else score = 15

    let healthLabel, healthColor
    if (score >= 80) { healthLabel = 'Saudável'; healthColor = '#00ff9f' }
    else if (score >= 50) { healthLabel = 'Atenção'; healthColor = '#ffcc00' }
    else { healthLabel = 'Crítico'; healthColor = '#ff0055' }

    return {
      pendentes, total, ritmoMensal, mesesParaZerar, anosParaZerar,
      hltbPendente, taxaConclusao, score,
      healthLabel, healthColor,
      zeradosAno: z2026.length, jogandoCount: jogando.length,
    }
  }, [zerados, jogando, backlog, pausados, abandonados])

  const s = stats

  return (
    <Accordion title="SAÚDE DO BACKLOG" color={s.healthColor} icon={<HeartPulse size={18} strokeWidth={2.5} />}>
      <div className="pt-4">
        {/* gauge */}
        <div className="flex justify-center mb-5">
          <HealthGauge score={s.score} label={s.healthLabel} color={s.healthColor} />
        </div>

        {/* metrics */}
        <div className="space-y-0">
          <MetricRow
            icon={<AlertTriangle size={16} strokeWidth={2.5} />}
            label="Pendentes"
            value={s.pendentes}
            sub={`de ${s.total} total (${s.taxaConclusao}% concluído)`}
            color="#ffcc00"
          />
          <MetricRow
            icon={s.ritmoMensal >= 3 ? <TrendingUp size={16} strokeWidth={2.5} /> : s.ritmoMensal >= 1 ? <Minus size={16} strokeWidth={2.5} /> : <TrendingDown size={16} strokeWidth={2.5} />}
            label="Ritmo Atual"
            value={`${s.ritmoMensal.toFixed(1)}/mês`}
            sub={`${s.zeradosAno} zerados em ${new Date().getFullYear()}`}
            color={s.ritmoMensal >= 3 ? '#00ff9f' : s.ritmoMensal >= 1 ? '#ffcc00' : '#ff0055'}
          />
          <MetricRow
            icon={<Skull size={16} strokeWidth={2.5} />}
            label="Tempo p/ Zerar Tudo"
            value={s.mesesParaZerar === Infinity ? '∞' : s.anosParaZerar < 1 ? `${s.mesesParaZerar}m` : `${s.anosParaZerar.toFixed(1)}a`}
            sub={s.mesesParaZerar === Infinity ? 'sem ritmo de conclusão' : `~${s.mesesParaZerar} meses no ritmo atual`}
            color={s.anosParaZerar <= 2 ? '#00ff9f' : s.anosParaZerar <= 5 ? '#ffcc00' : '#ff0055'}
          />
          {s.hltbPendente > 0 && (
            <MetricRow
              icon={<CheckCircle2 size={16} strokeWidth={2.5} />}
              label="HLTB Pendente"
              value={formatTime(s.hltbPendente)}
              sub="tempo estimado para jogar tudo"
              color="#94a3b8"
            />
          )}
        </div>
      </div>
    </Accordion>
  )
}
