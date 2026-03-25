import { useMemo } from 'react'
import { parseTime } from '../utils/helpers'
import { useGameDetail } from '../contexts/GameDetailContext'
import SectionTitle from './SectionTitle'
import { Trophy, Medal, Crown, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function PosterCard({ game, isGoty, isFame }) {
  const { t } = useTranslation()
  const { openGame } = useGameDetail()
  return (
    <div
      onClick={() => openGame({ ...game, _status: 'zerado' })}
      className={`rounded-lg overflow-hidden h-[180px] flex flex-col transition-all duration-400 relative cursor-pointer ${
        isGoty
          ? 'border-2 border-accent-gold animate-goty-pulse hover:translate-y-[-6px] hover:scale-[1.03]'
          : isFame
            ? 'border-2 border-accent-gold hover:translate-y-[-5px] hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]'
            : 'border-2 border-white/5 hover:translate-y-[-5px] hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]'
      }`}
    >
      {isGoty && (
        <>
          <div className="absolute top-1.5 left-1.5 z-10 bg-gradient-to-br from-accent-gold to-orange-500 text-[#1a0e00] font-heading font-black text-[0.58em] tracking-wider uppercase px-1.5 py-0.5 rounded shadow-[0_2px_8px_rgba(255,160,0,0.5)]">
                        <Medal size={10} strokeWidth={2.5} className="inline-block align-[-0.1em]" /> {t('hallOfFame.goty')}
          </div>
          <div className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent animate-shine-swipe z-[2] pointer-events-none" />
        </>
      )}
      <div className="flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
        <img src={game.capa} alt={game.nome} className="max-w-full max-h-full object-contain" />
      </div>
      <div className="px-2 py-1.5 bg-black/85 text-center border-t border-white/5">
        <div className="font-black text-[0.7em] text-white mb-0.5">{isGoty ? <><Crown size={12} strokeWidth={2.5} className="inline-block align-[-0.1em] text-accent-gold" /> </> : ''}{game.nome}</div>
        <div className={`text-[0.55em] font-extrabold uppercase ${isFame ? 'text-accent-gold' : 'text-dash-muted'}`}>
                    <Calendar size={10} strokeWidth={2.5} className="inline-block align-[-0.1em]" /> {game.ano_zerado || '—'}
        </div>
      </div>
    </div>
  )
}

export default function HallOfFame({ zerados }) {
  const { t } = useTranslation()
  const fameGames = useMemo(() => zerados.filter(g => g.nota === 10), [zerados])
  const fameAnos = useMemo(() =>
    [...new Set(fameGames.map(g => g.ano_zerado).filter(Boolean))].sort((a, b) => b - a),
    [fameGames]
  )

  const getGotyDoAno = (ano) => {
    const nota10 = fameGames.filter(g => g.ano_zerado === ano)
    if (nota10.length === 1) return nota10[0].nome
    if (nota10.length > 1)
      return [...nota10].sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))[0].nome
    const doAno = zerados.filter(g => g.ano_zerado === ano && g.nota != null)
    if (!doAno.length) return null
    const maxNota = Math.max(...doAno.map(g => Number(g.nota)))
    return doAno.filter(g => Number(g.nota) === maxNota).sort((a, b) => parseTime(b.tempo) - parseTime(a.tempo))[0].nome
  }

  if (fameGames.length === 0) return null

  return (
    <div className="mb-8">
      <SectionTitle icon={<Trophy size={22} strokeWidth={2.5} className="text-accent-gold" />}>{t('hallOfFame.title')}</SectionTitle>
      {fameAnos.map(ano => {
        const gAno = fameGames.filter(g => g.ano_zerado === ano)
        const gotyNome = getGotyDoAno(ano)
        return (
          <div key={ano} className="mb-5">
            <div className="font-heading font-black uppercase tracking-[3px] text-accent-gold mb-2.5 flex items-center gap-2">
                            <Medal size={14} strokeWidth={2.5} className="inline-block align-[-0.1em] text-accent-gold" /> {ano}
              <div className="flex-1 h-px bg-gradient-to-r from-accent-gold/40 to-transparent" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {gAno.map(g => (
                <PosterCard key={g.nome} game={g} isGoty={g.nome === gotyNome} isFame />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
