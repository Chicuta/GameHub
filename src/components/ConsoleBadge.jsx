import { getConsoleStyle } from '../utils/helpers'

export default function ConsoleBadge({ console: con }) {
  const s = getConsoleStyle(con)
  return (
    <span
      className="inline-flex items-center gap-1 text-[0.55em] font-black uppercase px-1.5 py-0.5 rounded border"
      style={{
        color: s.col,
        borderColor: `${s.col}40`,
        background: `${s.col}10`,
      }}
    >
      {s.ico} {s.name}
    </span>
  )
}
