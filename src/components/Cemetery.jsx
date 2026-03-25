import { useGameDetail } from '../contexts/GameDetailContext'
import SectionTitle from './SectionTitle'
import { Skull, Calendar } from 'lucide-react'

export default function Cemetery({ abandonados }) {
  const { openGame } = useGameDetail()

  if (abandonados.length === 0) return null

  return (
    <div className="mb-8">
      <SectionTitle icon={<Skull size={22} strokeWidth={2.5} className="text-accent-danger" />}>O CEMITÉRIO</SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5">
        {abandonados.map(g => (
          <div
            key={g.nome}
            onClick={() => openGame({ ...g, _status: 'abandonado' })}
            className="bg-dash-surface rounded-lg border-2 border-accent-danger overflow-hidden h-[180px] flex flex-col grayscale brightness-50 opacity-60 transition-all duration-500 hover:grayscale-0 hover:brightness-100 hover:opacity-100 hover:translate-y-[-5px] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,85,0.4)] cursor-pointer"
          >
            <div className="flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
              <img src={g.capa} alt={g.nome} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="px-2 py-1.5 bg-black/85 text-center border-t border-white/5">
              <div className="font-black text-[0.7em] text-accent-danger">{g.nome}</div>
              <div className="text-[0.55em] font-extrabold text-dash-muted uppercase flex items-center justify-center gap-0.5"><Calendar size={10} strokeWidth={2.5} /> {g.ano_abandonado || '—'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
