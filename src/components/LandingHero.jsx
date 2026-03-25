import { Link } from 'react-router-dom'
import { Gamepad2, Trophy, BarChart3, Clock, Target, Flame, TrendingUp, Swords } from 'lucide-react'
import TrendingGames from './TrendingGames'
import GotyList from './GotyList'

const features = [
  { icon: Trophy, color: '#fbbf24', title: 'Hall da Fama', desc: 'Destaque seus jogos nota 10 e celebre suas conquistas' },
  { icon: BarChart3, color: '#00f5ff', title: 'Estatísticas', desc: 'Acompanhe horas jogadas, médias e ritmo de conclusão' },
  { icon: Clock, color: '#a78bfa', title: 'Heatmap', desc: 'Visualize sua atividade ao longo do ano como um dev raiz' },
  { icon: Target, color: '#34d399', title: 'Backlog', desc: 'Organize sua fila de jogos por plataforma' },
  { icon: Flame, color: '#f87171', title: 'Cemitério', desc: 'Registre os jogos que você abandonou sem peso na consciência' },
  { icon: TrendingUp, color: '#60a5fa', title: 'Retrospectiva', desc: 'Veja sua evolução ano a ano com análises detalhadas' },
]

export default function LandingHero() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16 md:py-24">
        <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full px-4 py-1.5 mb-6">
          <Swords size={14} className="text-accent-cyan" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">Seu dashboard gamer pessoal</span>
        </div>

        <h1 className="font-heading font-black tracking-[3px] uppercase text-4xl md:text-6xl bg-gradient-to-r from-white via-accent-cyan to-accent-purple bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,245,255,0.2)] mb-4 flex items-center justify-center gap-3 md:gap-4">
          <Gamepad2 className="text-accent-cyan drop-shadow-[0_0_12px_rgba(0,245,255,0.5)]" size={48} strokeWidth={2.5} />
          CENTRAL GAMER
        </h1>

        <p className="text-dash-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Organize sua coleção, acompanhe seu progresso e descubra insights sobre seus hábitos de jogo — tudo em um só lugar.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/auth"
            className="font-heading font-black uppercase tracking-wider text-sm px-8 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all"
          >
            Começar Agora
          </Link>
          <Link
            to="/auth"
            className="font-heading font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl border border-white/10 text-dash-muted hover:text-white hover:border-white/20 transition-all"
          >
            Já tenho conta
          </Link>
        </div>
      </div>

      {/* Trending Games */}
      <TrendingGames />

      {/* GOTY */}
      <GotyList />

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {features.map(({ icon: Icon, color, title, desc }) => (
          <div
            key={title}
            className="bg-dash-surface/60 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} strokeWidth={2.5} />
              </div>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <p className="text-dash-muted text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-12">
        <div className="bg-dash-surface/40 border border-dash-border rounded-2xl p-8 md:p-12">
          <h2 className="font-heading font-black uppercase tracking-wider text-xl md:text-2xl text-white mb-3">
            Pronto para trackear seus jogos?
          </h2>
          <p className="text-dash-muted text-sm mb-6 max-w-md mx-auto">
            Crie sua conta gratuita e comece a montar sua coleção. Login rápido com Google disponível.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-wider text-sm px-8 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all"
          >
            <Gamepad2 size={18} strokeWidth={2.5} /> Criar Conta Grátis
          </Link>
        </div>
      </div>
    </div>
  )
}
