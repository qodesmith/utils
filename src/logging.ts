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
  const initialItems = [ansiStr]

  if (includeTime) {
    initialItems.push(`[${getLocalDate(timeZone)}]`)
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
      console.log(`[${getLocalDate(timeZone)}]`, ...items)
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
