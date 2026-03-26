import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const outDir = resolve(root, 'public')

const svgBuffer = readFileSync(resolve(outDir, 'favicon.svg'))

const sizes = [
  { size: 64, name: 'pwa-64x64.png' },
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 512, name: 'maskable-icon-512x512.png', maskable: true },
]

for (const { size, name, maskable } of sizes) {
  const img = sharp(svgBuffer).resize(size, size)
  
  if (maskable) {
    // maskable: add 10% padding with background color
    const padding = Math.round(size * 0.1)
    const innerSize = size - padding * 2
    const inner = await sharp(svgBuffer).resize(innerSize, innerSize).png().toBuffer()
    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 13, g: 13, b: 18, alpha: 1 } }
    })
      .composite([{ input: inner, left: padding, top: padding }])
      .png()
      .toFile(resolve(outDir, name))
  } else {
    await img.png().toFile(resolve(outDir, name))
  }
  
  console.log(`✅ ${name} (${size}x${size})`)
}

console.log('\n🎮 PWA icons generated!')
