import {getLocalDate} from './dates'
import {ansiColors} from './internal/ansiColors'

function logger(
  type: keyof typeof ansiColors,
  timeZone: string | undefined,
  messages: any[]
) {
  const ansiStr = ansiColors[type]
  const items = [ansiStr, `[${getLocalDate(timeZone)}]`].concat(
    messages.flatMap(item => {
      const isObj = typeof item === 'object' || typeof item === 'function'
      return isObj ? [item] : [ansiStr, item]
    })
  )

  console.log(...items)
}

/**
 * Logs with color and a date! Each log line is preceded by a date in the form
 * of `[6/13/2024, 9:45:57 AM]`. Objects are not colored and are logged as is.
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
 * Examples:
 *
 * `log.text('Hello!')` => `[6/13/2024, 9:45:57 AM] Hello!`
 */
export function createLogger({timeZone}: {timeZone?: string} = {}) {
  const log = {
    text(...items: any[]) {
      console.log(`[${getLocalDate(timeZone)}]`, ...items)
    },
    success(...items: any[]) {
      logger('success', timeZone, items)
    },
    error(...items: any[]) {
      logger('error', timeZone, items)
    },
    warning(...items: any[]) {
      logger('warning', timeZone, items)
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
  text(...items: any[]) {},
  success(...items: any[]) {},
  error(...items: any[]) {},
  warning(...items: any[]) {},
}
