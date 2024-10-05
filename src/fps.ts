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
