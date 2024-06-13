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
