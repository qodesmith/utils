/**
 * Waits for a specified number of milliseconds before resolving.
 *
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 *
 * @example
 * // Wait for 2 seconds
 * await wait(2000);
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Creates a debounced version of the provided function.
 *
 * This function returns a new function that, when invoked, will delay the
 * execution of the original function until after `wait` milliseconds have
 * elapsed since the last time it was invoked. This is useful for implementing
 * behavior that should only happen after a repeated action has completed.
 *
 * @param {T} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the input function.
 *
 * @example
 * // `searchFunction` will be called a max every 300ms.
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Converts a number of seconds into a formatted duration string, separated by
 * colons.
 *
 * @param {number} totalSeconds - The total number of seconds to convert
 * @returns {string} A formatted string representing the duration in hours:minutes:seconds or minutes:seconds
 *
 * @example
 * secondsToDuration(24) // '0:24'
 * secondsToDuration(60) // '1:00'
 * secondsToDuration(3600) // '1:00:00'
 * secondsToDuration(24 * 60 * 60 * 2 + 1) // '48:00:01'
 */
export function secondsToDuration(totalSeconds: number): string {
  // Ensure the input is a non-negative integer
  const seconds = Math.max(0, Math.floor(totalSeconds))

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Format seconds to always have two digits
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  // If there are hours, include them in the format
  if (hours > 0) {
    // Only force minutes to have two digits when hours are present
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${hours}:${formattedMinutes}:${formattedSeconds}`
  }

  // If no hours, just return minutes and seconds
  return `${minutes}:${formattedSeconds}`
}

/**
 * Converts a given quantity of time into milliseconds based on the specified
 * unit.
 *
 * @param {number} quantity - The amount of time to convert.
 * @param {'s' | 'm' | 'h' | 'd' | 'w' | 'y'} unit - The unit of time to convert from.
 *   - `s` for seconds
 *   - `m` for minutes
 *   - `h` for hours
 *   - `d` for days
 *   - `w` for weeks
 *   - `y` for years
 * @param {boolean} isLeapYear - Whether to calculate year as leap year (366 days) or regular year (365 days). Only affects 'y' unit.
 * @returns {number} The equivalent time in milliseconds.
 *
 * @example
 * getUnitInMs(1, 's') // 1000
 * getUnitInMs(1, 'm') // 60000
 * getUnitInMs(1, 'h') // 3600000
 * getUnitInMs(1, 'd') // 86400000
 * getUnitInMs(1, 'w') // 604800000
 * getUnitInMs(1, 'y') // 31536000000 (365 days)
 * getUnitInMs(1, 'y', true) // 31622400000 (366 days)
 */
export function getUnitInMs(
  quantity: number,
  unit: 's' | 'm' | 'h' | 'd' | 'w' | 'y',
  isLeapYear?: boolean
) {
  switch (unit) {
    case 's':
      return 1000 * quantity
    case 'm':
      return 1000 * 60 * quantity
    case 'h':
      return 1000 * 60 * 60 * quantity
    case 'd':
      return 1000 * 60 * 60 * 24 * quantity
    case 'w':
      return 1000 * 60 * 60 * 24 * 7 * quantity
    case 'y':
      return 1000 * 60 * 60 * 24 * (isLeapYear ? 366 : 365) * quantity
    default:
      throw new Error(`Unexpected unit: ${unit}`)
  }
}

/**
 * Converts a given quantity of time into seconds based on the specified unit.
 *
 * @param {number} quantity - The amount of time to convert.
 * @param {'ms' | 'm' | 'h' | 'd' | 'w' | 'y'} unit - The unit of time to convert from.
 *   - `ms` for milliseconds
 *   - `m` for minutes
 *   - `h` for hours
 *   - `d` for days
 *   - `w` for weeks
 *   - `y` for years
 * @param {boolean} isLeapYear - Whether to calculate year as leap year (366 days) or regular year (365 days). Only affects 'y' unit.
 * @returns {number} The equivalent time in seconds.
 *
 * @example
 * getUnitInSeconds(1000, 'ms') // 1
 * getUnitInSeconds(1, 'm') // 60
 * getUnitInSeconds(1, 'h') // 3600
 * getUnitInSeconds(1, 'd') // 86400
 * getUnitInSeconds(1, 'w') // 604800
 * getUnitInSeconds(1, 'y') // 31536000 (365 days)
 * getUnitInSeconds(1, 'y', true) // 31622400 (366 days)
 */
export function getUnitInSeconds(
  quantity: number,
  unit: 'ms' | 'm' | 'h' | 'd' | 'w' | 'y',
  isLeapYear?: boolean
) {
  switch (unit) {
    case 'ms':
      return quantity / 1000
    case 'm':
      return 60 * quantity
    case 'h':
      return 60 * 60 * quantity
    case 'd':
      return 60 * 60 * 24 * quantity
    case 'w':
      return 60 * 60 * 24 * 7 * quantity
    case 'y':
      return 60 * 60 * 24 * (isLeapYear ? 366 : 365) * quantity
    default:
      throw new Error(`Unexpected unit: ${unit}`)
  }
}

/**
 * Get the frames per second for the current browser.
 *
 * This function uses `requestAnimationFrame` over a 1 second period to
 * determine the FPS. It executes a callback function with a number representing
 * the calculated FPS.
 *
 * @param {function} cb - Callback function that receives the calculated FPS as a parameter.
 */
export function getFps<T>(cb: (num: number) => T) {
  let count = 0

  const oneSecondFromNow = Date.now() + 1000

  const nextAnimationFrame = (nafCb: () => void) => {
    requestAnimationFrame(nafCb)
  }

  const nafCb = () => {
    count++

    if (Date.now() <= oneSecondFromNow) {
      nextAnimationFrame(nafCb)
    } else {
      cb(count)
    }
  }

  nextAnimationFrame(nafCb)
}

/**
 * Get the frames per second for the current browser asynchronously.
 *
 * This function uses `requestAnimationFrame` over a 1 second period to
 * determine the FPS. It returns a promise that resolves to a number
 * representing the calculated FPS.
 *
 * @returns {Promise<number>} A promise that resolves to the calculated FPS.
 */
export async function genFps(): Promise<number> {
  return new Promise<number>(resolve => getFps(resolve))
}
