/**
 * Get the frames per second for the current browser. Uses
 * `requestAnimationFrame` over a 1 second period to determine the FPS.
 *
 * Executes a callback function with a number representing the FPS.
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
 * Async / promise-based version of `getFps`.
 *
 * Get the frames per second for the current browser. Uses
 * `requestAnimationFrame` over a 1 second period to determine the FPS.
 *
 * Returns a promise resolving to a number representing the FPS.
 */
export async function genFps(): Promise<number> {
  return new Promise<number>(resolve => getFps(resolve))
}
