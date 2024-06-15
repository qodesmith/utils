import fs from 'node:fs'
import path from 'node:path'
import dts from 'bun-plugin-dts'

const start = performance.now()

/**
 * Get a list of all the modules in this project to dynamically construct an
 * `index.ts` file so we don't "forget to add that last module we just created."
 */
const contents = fs.readdirSync('./src').reduce<string[]>((acc, item) => {
  if (!item.endsWith('.ts') || item.endsWith('.test.ts')) return acc

  const parsedItem = path.parse(item)
  acc.push(`export * from './src/${parsedItem.name}'`)

  return acc
}, [])

await Bun.write('./index.ts', `${contents.join('\n')}\n`)

await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  minify: true,
  // naming: '[name]-[hash].[ext]',
  target: 'bun',
  plugins: [dts()],
})

const totalTime = ((performance.now() - start) / 1000).toFixed(2)
console.log(`Finished building in ${totalTime} seconds`)
