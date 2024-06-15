import {getLocalDate} from './dates'

const ansi = {
  success: '\x1b[32m%s\x1b[0m',
  error: '\x1b[31m%s\x1b[0m',
  warning: '\x1b[33m%s\x1b[0m',
}

function logger(type: keyof typeof ansi, messages: any[]) {
  const ansiStr = ansi[type]
  const items = [ansiStr, `[${getLocalDate()}]`].concat(
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
export const log = {
  text(...items: any[]) {
    console.log(`[${getLocalDate()}]`, ...items)
  },
  success(...items: any[]) {
    logger('success', items)
  },
  error(...items: any[]) {
    logger('error', items)
  },
  warning(...items: any[]) {
    logger('warning', items)
  },
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
  text() {},
  success() {},
  error() {},
  warning() {},
}
