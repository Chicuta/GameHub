import { Gamepad2 } from 'lucide-react'

export default function Header() {
  return (
    <div className="mb-5 pb-2.5 border-b-2 border-white/5">
      <h1 className="font-heading font-black tracking-[4px] uppercase text-3xl md:text-4xl bg-gradient-to-r from-white via-accent-cyan to-accent-purple bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,245,255,0.2)] flex items-center gap-3">
        <Gamepad2 className="text-accent-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]" size={36} strokeWidth={2.5} /> CENTRAL GAMER
      </h1>
    </div>
  )
}
