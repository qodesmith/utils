import dts from 'bun-plugin-dts'

const start = performance.now()

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
