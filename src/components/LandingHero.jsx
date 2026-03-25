import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Gamepad2, Trophy, BarChart3, Clock, Target, Flame, TrendingUp, Swords } from 'lucide-react'
import TrendingGames from './TrendingGames'
import GotyList from './GotyList'

const featureIcons = [
  { icon: Trophy, color: '#fbbf24', key: 'hallOfFame' },
  { icon: BarChart3, color: '#00f5ff', key: 'stats' },
  { icon: Clock, color: '#a78bfa', key: 'heatmap' },
  { icon: Target, color: '#34d399', key: 'backlog' },
  { icon: Flame, color: '#f87171', key: 'cemetery' },
  { icon: TrendingUp, color: '#60a5fa', key: 'retro' },
]

export default function LandingHero() {
  const { t } = useTranslation()
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16 md:py-24">
        <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full px-4 py-1.5 mb-6">
          <Swords size={14} className="text-accent-cyan" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">{t('landing.tagline')}</span>
        </div>

        <h1 className="font-heading font-black tracking-[3px] uppercase text-4xl md:text-6xl bg-gradient-to-r from-white via-accent-cyan to-accent-purple bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,245,255,0.2)] mb-4 flex items-center justify-center gap-3 md:gap-4">
          <Gamepad2 className="text-accent-cyan drop-shadow-[0_0_12px_rgba(0,245,255,0.5)]" size={48} strokeWidth={2.5} />
          {t('landing.title')}
        </h1>

        <p className="text-dash-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {t('landing.description')}
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/auth"
            className="font-heading font-black uppercase tracking-wider text-sm px-8 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all"
          >
            {t('landing.cta')}
          </Link>
          <Link
            to="/auth"
            className="font-heading font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl border border-white/10 text-dash-muted hover:text-white hover:border-white/20 transition-all"
          >
            {t('landing.hasAccount')}
          </Link>
        </div>
      </div>

      {/* Trending Games */}
      <TrendingGames />

      {/* GOTY */}
      <GotyList />

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {featureIcons.map(({ icon: Icon, color, key }) => (
          <div
            key={key}
            className="bg-dash-surface/60 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} strokeWidth={2.5} />
              </div>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">{t(`landing.features.${key}.title`)}</h3>
            </div>
            <p className="text-dash-muted text-sm leading-relaxed">{t(`landing.features.${key}.desc`)}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-12">
        <div className="bg-dash-surface/40 border border-dash-border rounded-2xl p-8 md:p-12">
          <h2 className="font-heading font-black uppercase tracking-wider text-xl md:text-2xl text-white mb-3">
            {t('landing.bottomTitle')}
          </h2>
          <p className="text-dash-muted text-sm mb-6 max-w-md mx-auto">
            {t('landing.bottomDesc')}
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-wider text-sm px-8 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-dash-bg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all"
          >
            <Gamepad2 size={18} strokeWidth={2.5} /> {t('landing.ctaBottom')}
          </Link>
        </div>
      </div>
    </div>
  )
}
