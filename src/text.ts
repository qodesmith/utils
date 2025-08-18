import {getRandomArrayItem} from './arrays'

/**
 * Pluralizes a word based on the given amount.
 *
 * @param {number|string} amount - The quantity to determine pluralization
 * @param {string} word - The word to be pluralized
 * @returns {string} A string combining the amount and the pluralized word
 *
 * @example
 * pluralize(3, 'apple') // '3 apples'
 * pluralize('0', 'apple') // '0 apples'
 * pluralize(1, 'apple') // '1 apple'
 */
export function pluralize(
  amount: number | string,
  word: string,
  includeNumber = true
): string {
  const s = +amount === 1 ? '' : 's'
  return includeNumber ? `${amount} ${word}${s}` : `${word}${s}`
}

/**
 * Provides BASIC slug creation functionality. The result is a url-safe string
 * with the following rules:
 * - Upper and lowercase letters allowed
 * - Numbers allowed
 * - `-_.~` are the only special characters allowed
 * - Leading and trailing spaces are trimmed
 * - Spaces are converted to `-`
 * - Consecutive `-` will be reduced to a single `-`
 *
 * @param {string} text - The string to slugify
 * @returns {string} A slugified string
 *
 * @example
 * slugify('Hello world!') // 'Hello-world'
 * slugify('    ----This   is!@#$%^&a test  ') // '-This-isa-test'
 */
export function slugify(text: string): string {
  return (
    text
      // Remove any character that is not a letter, number, space, or -_.~
      .replace(/[^a-zA-Z0-9-_.~ ]/g, '')

      // Get rid of leading and trailing spaces
      .trim()

      // Replace spaces with hyphens
      .replace(/\s+/g, '-')

      // Replace consecutive hyphens with a single hyphen
      .replace(/-+/g, '-')
  )
}

/**
 * Generates a random pronounceable word by alternating between consonants and
 * vowels, starting with a consonant.
 *
 * @param {number} length - The length of the word to generate.
 * @returns {string} A randomly generated pronounceable word.
 */
export function getRandomPronounceableWord(lenth = 5) {
  const consonants = 'bcdfghjklmnpqrstvwxyz'.split('')
  const vowels = 'aeiou'.split('')
  let word = ''

  for (let i = 0; i < lenth; i++) {
    const isOdd = i % 2
    const array = isOdd ? vowels : consonants
    const randomLetter = getRandomArrayItem(array)

    word += randomLetter
  }

  return word
}

/**
 * Gets the true string length by removing ANSI escape sequences (color codes).
 * This is useful when measuring the display width of strings that contain terminal colors.
 *
 * @param {string} text - The string to measure
 * @returns {number} The true length of the string without ANSI escape sequences
 *
 * @example
 * getTrueStringLength('\u001b[31mHello\u001b[0m') // 5 (instead of 14)
 * getTrueStringLength('Hello World') // 11
 */
export function getTrueStringLength(text: string) {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: it's ok
  return text.replace(/\u001b\[.*?m/g, '').length
}

/**
 * Creates a formatted table string with Unicode box-drawing characters.
 * Supports thin, thick, and rounded corner styles.
 *
 * @param {Object} options - Table configuration options
 * @param {(string|number)[][]} options.rows - Array of table rows, where each row is an array of cell values
 * @param {number} [options.padding=1] - Number of spaces to pad each cell horizontally
 * @param {boolean} [options.rounded] - Use rounded corners (thin lines with rounded corners)
 * @param {boolean} [options.thick] - Use thick lines for the table border
 * @returns {string} A formatted table string with proper alignment and borders
 *
 * @throws {Error} Throws an error if rows have different lengths
 *
 * @example
 * makeTableString({
 *   rows: [['Name', 'Age'], ['John', 25], ['Jane', 30]]
 * })
 * // Returns a formatted table with thin borders
 *
 * @example
 * makeTableString({
 *   rows: [['A', 'B'], ['1', '2']],
 *   thick: true,
 *   padding: 2
 * })
 * // Returns a formatted table with thick borders and 2-space padding
 */
export function makeTableString({
  rows,
  padding = 1,
  ...rest
}: (
  | {rows: (string | number)[][]; rounded: true}
  | {rows: (string | number)[][]; thick: true}
  | {rows: (string | number)[][]}
) & {padding?: number}) {
  // Ensure all rows have the same length
  const expectedRowLength = rows[0].length
  const hasRowMismatch = rows.some(row => row.length !== expectedRowLength)

  if (hasRowMismatch) {
    throw new Error('All table rows must have the same length')
  }

  const thinTableSegments = {
    h: '─',
    v: '│',
    tl: '┌',
    t: '┬',
    tr: '┐',
    l: '├',
    m: '┼',
    r: '┤',
    bl: '└',
    b: '┴',
    br: '┘',
  } as const
  const thickTableSegments = {
    h: '━',
    v: '┃',
    tl: '┏',
    t: '┳',
    tr: '┓',
    l: '┣',
    m: '╋',
    r: '┫',
    bl: '┗',
    b: '┻',
    br: '┛',
  } as const

  // Unicode does NOT have thick rounded corners.
  const roundedTableSegments = {tl: '╭', tr: '╮', bl: '╰', br: '╯'} as const
  const tableSegments =
    'rounded' in rest
      ? {...thinTableSegments, ...roundedTableSegments}
      : 'thick' in rest
        ? thickTableSegments
        : thinTableSegments

  const columnWidths: number[] = rows[0].map(() => 0)

  for (const row of rows) {
    row.forEach((value, i) => {
      columnWidths[i] = Math.max(
        columnWidths[i],
        getTrueStringLength(value.toString())
      )
    })
  }
  // Each cell gets horizontal padding - default of 1 space on either side.
  const pad = ' '.repeat(padding)

  function createGridRow(type: 'top' | 'middle' | 'bottom'): string {
    const characters: Record<
      'top' | 'middle' | 'bottom',
      {l: string; m: string; r: string}
    > = {
      top: {l: tableSegments.tl, m: tableSegments.t, r: tableSegments.tr},
      middle: {l: tableSegments.l, m: tableSegments.m, r: tableSegments.r},
      bottom: {l: tableSegments.bl, m: tableSegments.b, r: tableSegments.br},
    }

    return [
      characters[type].l,
      ...columnWidths.map((colWidth, i) => {
        const isLastCol = i === columnWidths.length - 1
        const horizonatals = tableSegments.h.repeat(colWidth + padding * 2)
        return `${horizonatals}${isLastCol ? '' : characters[type].m}`
      }),
      characters[type].r,
    ].join('')
  }

  // Table grid.
  const gridRowTop = createGridRow('top')
  const gridRowMiddle = createGridRow('middle')
  const gridRowBottom = createGridRow('bottom')

  // Final table string.
  const tableString = rows.reduce<string>((acc, row, i) => {
    const isFirstRow = i === 0
    const isLastRow = i === rows.length - 1

    if (isFirstRow) {
      acc += `${gridRowTop}\n`
    }

    const rowContents = row
      .map((item, j) => {
        const columnWidth = columnWidths[j]
        const isLastRowItem = j === row.length - 1
        const cellValue = item.toString()
        const cellContentLength = getTrueStringLength(cellValue)
        const cellContentPaddingLength = Math.max(
          0,
          columnWidth - cellContentLength
        )
        const cellContentPadding = ' '.repeat(cellContentPaddingLength)
        const cellContent = `${pad}${cellValue}${cellContentPadding}${pad}`
        const {v} = tableSegments

        return `${v}${cellContent}${isLastRowItem ? v : ''}`
      })
      .join('')

    acc += `${rowContents}\n`

    if (isLastRow) {
      acc += gridRowBottom
    } else {
      acc += `${gridRowMiddle}\n`
    }

    return acc
  }, '')

  return tableString
}
