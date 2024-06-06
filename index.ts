export function getLocalDate(timeZone?: string) {
  return new Date().toLocaleString('en-US', {timeZone})
}

export const log = (() => {
  const ansi = {
    success: '\x1b[32m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    warning: '\x1b[33m%s\x1b[0m',
  }

  function logger(type: keyof typeof ansi, messages: any[]) {
    const ansiStr = ansi[type]
    const msgs = [ansiStr, `[${getLocalDate()}]`].concat(
      messages.flatMap(msg => [ansiStr, msg])
    )

    console.log(...msgs)
  }

  return {
    text(...messages: any[]) {
      console.log(`[${getLocalDate()}]`, ...messages)
    },
    success(...messages: any[]) {
      logger('success', messages)
    },
    error(...messages: any[]) {
      logger('error', messages)
    },
    warning(...messages: any[]) {
      logger('warning', messages)
    },
  }
})()
