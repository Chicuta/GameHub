export function getConsoleStyle(con) {
  const c = (con || '').toLowerCase()
  if (c.includes('steam deck') || c.includes('deck')) return { col: '#1a9fff', ico: '◆', name: 'Steam Deck' }
  if (c.includes('ps1') || c.includes('playstation 1')) return { col: '#AAAFB4', ico: '▣', name: 'PS1' }
  if (c.includes('ps2') || c.includes('playstation 2')) return { col: '#2E6DB4', ico: '▣', name: 'PS2' }
  if (c.includes('ps3') || c.includes('playstation 3')) return { col: '#FF0000', ico: '▣', name: 'PS3' }
  if (c.includes('ps4') || c.includes('playstation 4')) return { col: '#003791', ico: '▣', name: 'PS4' }
  if (c.includes('ps5') || c.includes('playstation 5')) return { col: '#FFFFFF', ico: '▢', name: 'PS5' }
  if (c.includes('xbox 360')) return { col: '#5cb85c', ico: '◈', name: 'X360' }
  if (c.includes('xbox one')) return { col: '#107c10', ico: '◈', name: 'XONE' }
  if (c.includes('xbox series')) return { col: '#107c10', ico: '◈', name: 'XSERIES' }
  if (c.includes('snes') || c.includes('super nintendo')) return { col: '#8265A1', ico: '●', name: 'SNES' }
  if (c.includes('switch')) return { col: '#e60012', ico: '◉', name: 'SWITCH' }
  if (c.includes('wii')) return { col: '#009AC7', ico: '○', name: 'WII' }
  if (c.includes('3ds') || c.includes('ds')) return { col: '#D12228', ico: '◉', name: 'DS/3DS' }
  if (c.includes('saturn')) return { col: '#005194', ico: '◎', name: 'SATURN' }
  if (c.includes('mega drive') || c.includes('genesis')) return { col: '#000000', ico: '◐', name: 'MEGA DRIVE' }
  if (c.includes('sega cd')) return { col: '#1a1a2e', ico: '◑', name: 'SEGA CD' }
  if (c.includes('pc') || c.includes('steam')) return { col: '#39ff14', ico: '▪', name: 'PC' }
  if (c.includes('android') || c.includes('mobile')) return { col: '#3ddc84', ico: '◇', name: 'MOBILE' }
  return { col: '#bc13fe', ico: '◆', name: con || 'MULTI' }
}

export function formatTime(h) {
  if (!h && h !== 0) return '0h 00m'
  const hrs = Math.floor(h)
  const min = Math.round((h - hrs) * 60)
  return `${hrs}h ${min.toString().padStart(2, '0')}m`
}

export function parseTime(t) {
  if (!t && t !== 0) return 0
  if (typeof t === 'number') return t
  const s = String(t).replace(/[\s\u00a0\u200b]+/g, '').trim()
  const matchHM = s.match(/^(\d+):(\d{2})/)
  if (matchHM) return (parseInt(matchHM[1]) || 0) + (parseInt(matchHM[2]) || 0) / 60
  const matchHM2 = s.match(/^(\d+)h(\d+)/i)
  if (matchHM2) return (parseInt(matchHM2[1]) || 0) + (parseInt(matchHM2[2]) || 0) / 60
  const matchH = s.match(/^(\d+(?:\.\d+)?)h/i)
  if (matchH) return parseFloat(matchH[1]) || 0
  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}

export function daysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1)
  const d2 = new Date(dateStr2)
  return Math.ceil((d2 - d1) / 86400000)
}

export function todayStr() {
  return new Date().toISOString().split('T')[0]
}

export function formatDateBR(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}
