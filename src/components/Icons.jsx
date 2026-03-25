import {
  Flame, CheckCircle2, ClipboardList, Skull, Search, PenLine,
  Gamepad2, Star, Trophy, Medal, Crown, Calendar, Clock,
  Zap, TrendingUp, BarChart3, Dna, Swords, Rocket, Gem,
  Sparkles, Scale, MonitorSmartphone, Keyboard, Smartphone,
  CircleDot, Crosshair, Globe, Loader2,
} from 'lucide-react'

// Ícone inline com tamanho padrão para texto
const d = { size: '1em', strokeWidth: 2.5, className: 'inline-block align-[-0.125em]' }

export const I = {
  // Status
  flame:      (p) => <Flame {...d} {...p} />,
  check:      (p) => <CheckCircle2 {...d} {...p} />,
  backlog:    (p) => <ClipboardList {...d} {...p} />,
  skull:      (p) => <Skull {...d} {...p} />,
  
  // Actions
  search:     (p) => <Search {...d} {...p} />,
  pen:        (p) => <PenLine {...d} {...p} />,
  
  // Game
  gamepad:    (p) => <Gamepad2 {...d} {...p} />,
  star:       (p) => <Star {...d} {...p} />,
  trophy:     (p) => <Trophy {...d} {...p} />,
  medal:      (p) => <Medal {...d} {...p} />,
  crown:      (p) => <Crown {...d} {...p} />,
  swords:     (p) => <Swords {...d} {...p} />,
  rocket:     (p) => <Rocket {...d} {...p} />,
  gem:        (p) => <Gem {...d} {...p} />,
  sparkles:   (p) => <Sparkles {...d} {...p} />,
  
  // Data
  calendar:   (p) => <Calendar {...d} {...p} />,
  clock:      (p) => <Clock {...d} {...p} />,
  zap:        (p) => <Zap {...d} {...p} />,
  trending:   (p) => <TrendingUp {...d} {...p} />,
  chart:      (p) => <BarChart3 {...d} {...p} />,
  dna:        (p) => <Dna {...d} {...p} />,
  scale:      (p) => <Scale {...d} {...p} />,
  
  // Devices
  monitor:    (p) => <MonitorSmartphone {...d} {...p} />,
  keyboard:   (p) => <Keyboard {...d} {...p} />,
  phone:      (p) => <Smartphone {...d} {...p} />,
  dot:        (p) => <CircleDot {...d} {...p} />,
  crosshair:  (p) => <Crosshair {...d} {...p} />,
  globe:      (p) => <Globe {...d} {...p} />,
  loader:     (p) => <Loader2 {...d} {...p} />,
}
