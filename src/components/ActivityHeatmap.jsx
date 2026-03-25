import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { parseTime, formatTime, getConsoleStyle } from '../utils/helpers'
import Accordion from './Accordion'
import ConsoleBadge from './ConsoleBadge'
import { Calendar, Flame, Clock } from 'lucide-react'

function getColorHM(count) {
  if (!count) return 'rgba(255,255,255,0.04)'
  if (count === 1) return 'rgba(0,255,135,0.35)'
  if (count === 2) return 'rgba(0,255,135,0.6)'
  return '#00ff87'
}

export default function ActivityHeatmap({ zerados }) {
  const { t } = useTranslation()
  const ANO = new Date().getFullYear()
  const hoje = new Date().toISOString().split('T')[0]
  const MESES = t('heatmap.months', { returnObjects: true })
  const MESES_FULL = t('heatmap.monthsFull', { returnObjects: true })
  const DIAS = t('heatmap.days', { returnObjects: true })

  const { mapaJogos, mapaAtividade, temDataReal } = useMemo(() => {
    const mj = {}
    const ma = {}
    let hasDR = false
    zerados.forEach(g => {
      let dateStr = null
      if (g.data_zerado) {
        dateStr = g.data_zerado
        hasDR = true
      } else if (g.ano_zerado) {
        dateStr = `${g.ano_zerado}-01-01`
      }
      if (!dateStr) return
      if (!mj[dateStr]) mj[dateStr] = []
      mj[dateStr].push(g)
      ma[dateStr] = (ma[dateStr] || 0) + 1
    })
    return { mapaJogos: mj, mapaAtividade: ma, temDataReal: hasDR }
  }, [zerados])

  const stats = useMemo(() => {
    const diasAtivos = Object.keys(mapaAtividade).filter(d => d.startsWith(String(ANO)))
    const jogosAno = diasAtivos.reduce((s, k) => s + mapaAtividade[k], 0)
    const melhorDia = diasAtivos.length
      ? diasAtivos.map(k => [k, mapaAtividade[k]]).sort((a, b) => b[1] - a[1])[0]
      : null

    const zeradosAno = zerados.filter(g => g.ano_zerado === ANO)
    const notasAno = zeradosAno.map(g => Number(g.nota)).filter(n => !isNaN(n) && n > 0)
    const mediaAno = notasAno.length ? (notasAno.reduce((s, v) => s + v, 0) / notasAno.length).toFixed(1) : '—'
    const horasAno = zeradosAno.reduce((s, g) => s + parseTime(g.tempo), 0)

    let streak = 0
    const cur = new Date(hoje)
    while (streak < 365) {
      const k = cur.toISOString().split('T')[0]
      if (mapaAtividade[k]) { streak++; cur.setDate(cur.getDate() - 1) }
      else break
    }

    return { jogosAno, diasAtivos: diasAtivos.length, melhorDia, mediaAno, horasAno, streak }
  }, [zerados, mapaAtividade, ANO, hoje])

  const semanas = useMemo(() => {
    const fim = new Date(ANO, 11, 31)
    const primeiroDia = new Date(ANO, 0, 1)
    primeiroDia.setDate(primeiroDia.getDate() - primeiroDia.getDay())
    const weeks = []
    let week = []
    const cur = new Date(primeiroDia)
    while (cur <= fim || week.length > 0) {
      week.push(new Date(cur))
      if (week.length === 7) { weeks.push(week); week = [] }
      cur.setDate(cur.getDate() + 1)
      if (cur > fim && week.length > 0) {
        while (week.length < 7) week.push(null)
        weeks.push(week)
        break
      }
    }
    return weeks
  }, [ANO])

  const mesLabels = useMemo(() => {
    const labels = []
    let mesAtual = -1
    semanas.forEach((sem, i) => {
      const pDia = sem.find(d => d && d.getFullYear() === ANO)
      if (pDia && pDia.getMonth() !== mesAtual) {
        mesAtual = pDia.getMonth()
        labels.push({ idx: i, nome: MESES[mesAtual] })
      }
    })
    return labels
  }, [semanas, ANO])

  const jogosDoMes = useMemo(() => {
    const mesNum = new Date().getMonth()
    return zerados
      .filter(g => g.data_zerado && new Date(g.data_zerado).getFullYear() === ANO && new Date(g.data_zerado).getMonth() === mesNum)
      .sort((a, b) => new Date(b.data_zerado) - new Date(a.data_zerado))
  }, [zerados, ANO])

  const mesAtualNome = MESES_FULL[new Date().getMonth()]

  return (
    <Accordion title={t('heatmap.title', { year: ANO })} color="#00f5ff" icon={<Calendar size={18} strokeWidth={2.5} />}>
      <div className="pt-3">
        {/* Stats row */}
        <div className="flex flex-wrap gap-2.5 mb-4">
          {[
            { val: stats.jogosAno, label: t('heatmap.gamesInYear', { year: ANO }), color: '#00ff87' },
            { val: temDataReal ? stats.diasAtivos : '—', label: t('heatmap.activeDays'), color: '#00f5ff' },
            { val: stats.melhorDia ? stats.melhorDia[1] : '—', label: t('heatmap.recordPerDay'), color: '#ffcc00' },
            { val: stats.streak > 0 ? `${stats.streak}★` : '0', label: t('heatmap.currentStreak'), color: '#f472b6' },
            { val: stats.mediaAno, label: t('heatmap.avgRating'), color: '#bc13fe' },
            { val: formatTime(stats.horasAno), label: t('heatmap.hoursInYear', { year: ANO }), color: '#818cf8' },
          ].map((s, i) => (
            <div key={i} className="bg-black/30 border border-white/5 rounded-lg px-3.5 py-2 text-center min-w-[70px]">
              <span className="font-heading text-xl font-bold block" style={{ color: s.color }}>{s.val}</span>
              <div className="text-[0.58em] font-extrabold uppercase tracking-wider text-dash-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto pb-1.5">
          <div className="flex gap-[3px] min-w-max">
            <div className="flex flex-col gap-[2px] mr-1 pt-[18px]">
              {DIAS.map((d, i) => (
                <div key={i} className="h-[11px] text-[0.55em] font-bold text-[#475569] leading-[11px] uppercase tracking-wider w-3 text-center">{d}</div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="grid gap-[2px] mb-1 h-3.5" style={{ gridTemplateColumns: `repeat(${semanas.length}, 13px)` }}>
                {mesLabels.map((m, i) => (
                  <div key={i} className="text-[0.55em] font-bold text-[#64748b] uppercase tracking-wider whitespace-nowrap" style={{ gridColumn: m.idx + 1 }}>{m.nome}</div>
                ))}
              </div>
              <div className="flex gap-[2px]">
                {semanas.map((sem, wi) => (
                  <div key={wi} className="flex flex-col gap-[2px]">
                    {sem.map((dia, di) => {
                      if (!dia || dia.getFullYear() !== ANO) {
                        return <div key={di} className="w-[11px] h-[11px] rounded-sm" />
                      }
                      const key = dia.toISOString().split('T')[0]
                      const jogos = mapaJogos[key] || []
                      const count = jogos.length
                      const isHoje = key === hoje
                      const tooltip = count === 0
                        ? `${dia.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}: ${t('heatmap.none')}`
                        : `${dia.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}: ${jogos.map(j => j.nome).join(', ')}`
                      return (
                        <div
                          key={di}
                          className={`w-[11px] h-[11px] rounded-sm cursor-default transition-transform duration-100 hover:scale-150 hover:shadow-[0_0_6px_rgba(0,255,135,0.5)] hover:z-10 hover:relative ${isHoje ? 'ring-[1.5px] ring-accent-cyan' : ''}`}
                          style={{ background: getColorHM(count) }}
                          title={tooltip}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2.5 justify-end">
          <span className="text-[0.6em] font-bold text-[#475569] uppercase tracking-wider">{t('heatmap.less')}</span>
          {['rgba(255,255,255,0.04)', 'rgba(0,255,135,0.35)', 'rgba(0,255,135,0.6)', '#00ff87'].map((c, i) => (
            <div key={i} className="w-[11px] h-[11px] rounded-sm inline-block" style={{ background: c }} />
          ))}
          <span className="text-[0.6em] font-bold text-[#475569] uppercase tracking-wider">{t('heatmap.more')}</span>
        </div>

        {/* Monthly list */}
        <div className="h-px bg-white/5 my-4" />
        <div className="font-heading text-sm font-black uppercase tracking-[2px] text-dash-muted mb-2.5 flex items-center gap-1"><Calendar size={14} strokeWidth={2.5} /> {t('heatmap.completedInMonth', { month: mesAtualNome })}</div>
        {jogosDoMes.length > 0 ? jogosDoMes.map(g => {
          const s = getConsoleStyle(g.console)
          const nota = g.nota != null ? g.nota : '—'
          const notaCor = nota >= 9 ? '#ffcc00' : nota >= 7 ? '#00ff9f' : nota >= 5 ? '#00f5ff' : '#94a3b8'
          const diaFmt = g.data_zerado ? new Date(g.data_zerado).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '—'
          return (
            <div key={g.nome} className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-b-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.col }} />
              <div className="flex-1 min-w-0">
                <div className="font-black text-[0.82em] text-white whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">{g.nome}</div>
                <div className="flex items-center gap-1.5 text-[0.7em]">
                  <ConsoleBadge console={g.console} />
                  <span className="text-dash-muted text-[0.9em] flex items-center gap-0.5"><Clock size={13} strokeWidth={2.5} /> {formatTime(parseTime(g.tempo))}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-heading font-black text-[0.9em]" style={{ color: notaCor }}>{nota !== '—' ? `${nota}/10` : '—'}</div>
                <div className="text-[0.6em] font-bold text-[#475569] mt-0.5">{diaFmt}</div>
              </div>
            </div>
          )
        }) : (
          <div className="text-[0.75em] text-[#475569] py-2">{t('heatmap.noCompletedInMonth', { month: mesAtualNome })}</div>
        )}
      </div>
    </Accordion>
  )
}
