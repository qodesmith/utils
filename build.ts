import dts from 'bun-plugin-dts'

const start = performance.now()

/**
 * Get a list of all the modules in this project to dynamically construct an
 * `index.ts` file so we don't "forget to add that last module we just created."
 */
const contents = Array.from(new Bun.Glob('src/*.ts').scanSync())
  .filter(file => !file.endsWith('.test.ts'))
  .map(file => `export * from './${file.slice(0, -3)}'`)
  .sort()
const headerComments = [
  '///////////////////////////////////////',
  '// AUTO-GENERATED FILE - DO NOT EDIT //',
  '///////////////////////////////////////',
  '',
  '// biome-ignore-all lint/performance/noBarrelFile: this barrel file is only needed internally for the build',
  '// biome-ignore-all lint/performance/noReExportAll: this barrel file is only needed internally for the build',
  '',
].join('\n')

await Bun.write('./index.ts', `${headerComments}\n${contents.join('\n')}\n`)

await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  // naming: '[name]-[hash].[ext]',
  target: 'bun',
  plugins: [dts()],
  sourcemap: 'linked',
})

const totalTime = ((performance.now() - start) / 1000).toFixed(2)

// biome-ignore lint/suspicious/noConsole: expected here
console.log(`Finished building in ${totalTime} seconds`)
