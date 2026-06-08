/** biome-ignore-all lint/suspicious/noExplicitAny: this is ok here */
/** biome-ignore-all lint/suspicious/noConsole: this is needed for a logger! */

import {getLocalDate} from './dates'
import {ansiColors} from './internal/ansiColors'

function logger(
  type: keyof typeof ansiColors,
  timeZone: string | undefined,
  includeTime: boolean,
  messages: any[]
) {
  const ansiStr = ansiColors[type]
  const initialItems = []

  if (includeTime) {
    initialItems.push(ansiStr, `[${getLocalDate(timeZone)}]`)
  }

  const items = initialItems.concat(
    messages.flatMap(item => {
      const isObj = typeof item === 'object' || typeof item === 'function'
      return isObj ? [item] : [ansiStr, item]
    })
  )

  console.log(...items)
}

/**
 * Creates a logger object with colored and timestamped logging methods.
 *
 * Each log line is preceded by a date in the form of `[6/13/2024, 9:45:57 AM]`.
 * Objects are not colored and are logged as is.
 *
 * The following methods are available:
 *
 * `text`: The same a `console.log`. No color output is applied.
 *
 * `success`: A green (or aqua) color is applied to the log.
 *
 * `error`: A red color is applied to the log.
 *
 * `warning`: A yellow color is applied to the log.
 *
 * @param {Object} options - The options for creating the logger.
 * @param {string} [options.timeZone] - The time zone to use for timestamps.
 * @returns {Object} An object with logging methods: `text`, `success`, `error`, and `warning`.
 *
 * @example
 * log.text('Hello!') // `[6/13/2024, 9:45:57 AM] Hello!`
 */
export function createLogger({
  timeZone,
  includeTime = true,
}: {
  timeZone?: string
  includeTime?: boolean
} = {}) {
  const log = {
    text(...items: any[]) {
      if (includeTime) {
        items.unshift(`[${getLocalDate(timeZone)}]`)
      }

      console.log(...items)
    },
    success(...items: any[]) {
      logger('success', timeZone, includeTime, items)
    },
    error(...items: any[]) {
      logger('error', timeZone, includeTime, items)
    },
    warning(...items: any[]) {
      logger('warning', timeZone, includeTime, items)
    },
  }

  return log
}

/**
 * A convenience export so consumers can implement a conditional "silent" logger
 * without having to stub this object themselves, leaving the business logic
 * untouched.
 *
 * Example:
 *
 * ```
 * import {log, emptyLog} from '@qodesmith/utils'
 *
 * const logger = silent ? emptyLog : log
 *
 * // Business logic...
 * logger.text('Hello world!')
 * ```
 */
export const emptyLog = {
  text(..._items: any[]) {},
  success(..._items: any[]) {},
  error(..._items: any[]) {},
  warning(..._items: any[]) {},
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
