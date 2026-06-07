/** biome-ignore-all lint/suspicious/noConsole: expected here */

import path from 'node:path'
import process from 'node:process'

const docsReadmePath = path.resolve(import.meta.dir, '../../docs/README.md')
if (!(await Bun.file(docsReadmePath).exists())) {
  console.error("docs/README.md hasn't been generated yet")
  process.exit(1)
}

const docsReadmeRaw = await Bun.file(docsReadmePath).text()
const docsReadmeLines = docsReadmeRaw.split('\n')
const titleIndex = docsReadmeLines.indexOf('## Modules')

if (titleIndex === -1) {
  console.error('Title index not found in docs/README.md')
  process.exit(1)
}

const modulesSection = docsReadmeLines
  .slice(titleIndex)
  .join('\n')
  .replaceAll('](', '](docs/')
  .trim()

const rootReadmePath = path.resolve(import.meta.dir, '../../README.md')
const rootReadmeRaw = await Bun.file(rootReadmePath).text()
const rootReadmeLines = rootReadmeRaw.split('\n')
const startComment = '<!-- BEGIN UTILITIES -->'
const endComment = '<!-- END UTILITIES -->'
const startCommentIndex = rootReadmeLines.indexOf(startComment)
const endCommentIndex = rootReadmeLines.indexOf(endComment)

if (startCommentIndex === -1 || endCommentIndex === -1) {
  console.error('Could not find the comments in the root README.md')
  process.exit(1)
}

// Remove the contents between the comments, leaving the comments themselves.
rootReadmeLines.splice(
  startCommentIndex + 1,
  endCommentIndex - startCommentIndex - 1,
  modulesSection
)

const finalRootReadmeContents = rootReadmeLines.join('\n')
await Bun.write(rootReadmePath, finalRootReadmeContents)
