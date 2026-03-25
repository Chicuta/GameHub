export default function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <h2 className="font-heading font-black text-white uppercase tracking-[2px] text-lg md:text-xl flex items-center gap-2.5 whitespace-nowrap">
        {icon} {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-dash-border to-transparent" />
    </div>
  )
}
