import { useState } from 'react'

export default function Accordion({ title, color, icon, rightText, borderColor, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-dash-surface rounded-xl border border-white/5 mb-3 overflow-hidden"
      style={borderColor ? { borderLeft: `5px solid ${borderColor}` } : {}}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer font-heading font-black text-lg uppercase tracking-wider"
        style={{ color: color || '#fff' }}
      >
        <span className="flex items-center gap-2">
          {icon} {title}
        </span>
        <span className="flex items-center gap-3">
          {rightText && <span className="opacity-70 text-[0.65em] font-heading">{rightText}</span>}
          <span className={`text-sm text-dash-muted transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>▸</span>
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 border-t border-white/5">
          {children}
        </div>
      )}
    </div>
  )
}
