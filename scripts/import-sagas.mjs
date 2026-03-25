/**
 * Converts Obsidian saga markdown files to sagas.json for the React app.
 * Run: node scripts/import-sagas.mjs
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const SAGAS_DIR = join(process.cwd(), 'ob', 'Jogos', 'Sagas')
const OUT = join(process.cwd(), 'src', 'data', 'sagas.json')

function cleanTildes(str) {
  return str.replace(/~~/g, '').replace(/\[\[|\]\]/g, '').trim()
}

function parseSagaFile(content, filename) {
  const emoji = filename.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}])/u)?.[1] || '🎮'
  const name = filename.replace(/\.md$/, '').replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]\s*/u, '').trim()

  const lines = content.split('\n').filter(l => l.trim().startsWith('|'))
  if (lines.length < 3) return null

  // detect header
  const headerCells = lines[0].split('|').map(c => c.trim()).filter(Boolean)
  const hasHltb = headerCells.some(h => h.toLowerCase().includes('hltb'))

  const games = []
  // skip header + separator (lines 0 and 1)
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').map(c => c.trim()).filter(Boolean)
    if (cells.length < 4) continue

    const checkRaw = cells[0]
    const done = checkRaw.includes('✅')

    const yearRaw = cleanTildes(cells[1])
    const year = parseInt(yearRaw) || null

    const gameName = cleanTildes(cells[2])
    const consoleName = cleanTildes(cells[3])

    let hltb = null
    let capa = null

    if (hasHltb) {
      const hltbRaw = cleanTildes(cells[4] || '')
      const m = hltbRaw.match(/(\d+)h(\d+)?/)
      if (m) hltb = parseFloat(m[1]) + (parseInt(m[2] || 0) / 60)
      capa = cleanTildes(cells[6] || cells[5] || '')
    } else {
      capa = cleanTildes(cells[5] || cells[4] || '')
    }

    if (capa && !capa.startsWith('http')) capa = null

    games.push({ nome: gameName, console: consoleName, ano: year, hltb, capa, done })
  }

  return { emoji, nome: name, games }
}

async function main() {
  const files = await readdir(SAGAS_DIR)
  const mdFiles = files.filter(f => f.endsWith('.md'))

  const sagas = []
  for (const file of mdFiles) {
    const content = await readFile(join(SAGAS_DIR, file), 'utf-8')
    const saga = parseSagaFile(content, file)
    if (saga && saga.games.length > 0) sagas.push(saga)
  }

  sagas.sort((a, b) => a.nome.localeCompare(b.nome))

  await writeFile(OUT, JSON.stringify(sagas, null, 2), 'utf-8')
  console.log(`✅ ${sagas.length} sagas exported to src/data/sagas.json`)
  for (const s of sagas) {
    const done = s.games.filter(g => g.done).length
    console.log(`  ${s.emoji} ${s.nome}: ${done}/${s.games.length} completed`)
  }
}

main().catch(console.error)
