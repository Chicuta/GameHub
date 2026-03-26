import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Download, RefreshCw, X, WifiOff } from 'lucide-react'

/* ── Update Prompt ──────────────────────────────── */
export function PwaUpdatePrompt() {
  const { t } = useTranslation()
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-3 rounded-xl bg-dash-surface/95 border border-dash-border px-4 py-3 shadow-lg backdrop-blur-md animate-[slideUp_0.3s_ease-out]">
      <RefreshCw size={18} className="text-accent-cyan shrink-0" />
      <span className="text-sm font-bold text-dash-text">
        {t('pwa.updateAvailable')}
      </span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="rounded-lg bg-accent-cyan/20 px-3 py-1 text-xs font-bold text-accent-cyan hover:bg-accent-cyan/30 transition-colors"
      >
        {t('pwa.updateNow')}
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="text-dash-muted hover:text-dash-text transition-colors"
        aria-label={t('pwa.dismiss')}
      >
        <X size={16} />
      </button>
    </div>
  )
}

/* ── Install Button ─────────────────────────────── */
export function PwaInstallButton() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  // hide if already installed or no prompt
  useEffect(() => {
    const onInstalled = () => setDeferredPrompt(null)
    window.addEventListener('appinstalled', onInstalled)
    return () => window.removeEventListener('appinstalled', onInstalled)
  }, [])

  if (!deferredPrompt) return null

  const handleInstall = async () => {
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-1.5 rounded-lg bg-accent-cyan/10 px-3 py-1.5 text-xs font-bold text-accent-cyan hover:bg-accent-cyan/20 transition-colors border border-accent-cyan/20"
      title={t('pwa.install')}
    >
      <Download size={14} strokeWidth={2.5} />
      {t('pwa.install')}
    </button>
  )
}

/* ── Offline Banner ─────────────────────────────── */
export function OfflineBanner() {
  const { t } = useTranslation()
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const goOffline = () => setIsOffline(true)
    const goOnline = () => setIsOffline(false)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed top-0 inset-x-0 z-[9999] flex items-center justify-center gap-2 bg-accent-danger/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
      <WifiOff size={16} />
      {t('pwa.offline')} — {t('pwa.offlineDesc')}
    </div>
  )
}
