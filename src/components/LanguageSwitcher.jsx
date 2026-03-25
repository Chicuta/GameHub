import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isPt = i18n.language?.startsWith('pt')

  return (
    <button
      onClick={() => i18n.changeLanguage(isPt ? 'en' : 'pt-BR')}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider border border-white/10 rounded-lg px-2.5 py-1.5 text-dash-muted hover:text-white hover:border-white/20 transition-colors cursor-pointer"
      title={isPt ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe size={14} strokeWidth={2.5} />
      {isPt ? 'EN' : 'PT'}
    </button>
  )
}
