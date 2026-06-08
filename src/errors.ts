import {isPlainObject} from './objects'
import {createLogger} from './terminal'

/**
 * Converts an Error object into a plain JavaScript object.
 * This function is useful for serializing Error objects, which may contain
 * non-enumerable properties.
 *
 * @param {any} error - The Error object to convert.
 * @returns {Record<string, unknown>} A plain object representation of the Error.
 */
export function errorToObject(
  // biome-ignore lint/suspicious/noExplicitAny: this is ok here
  error: any,
  options?: {prettyStack: boolean}
): Record<string, unknown> {
  if (typeof error === 'string') {
    return {message: error}
  }

  return Object.getOwnPropertyNames(error ?? {}).reduce<
    Record<string, unknown>
  >((acc, key) => {
    /**
     * The `cause` property may be an error object as well.
     * Look for errors deeply nested within the object.
     */
    if (error[key] instanceof Error || isPlainObject(error[key])) {
      const errorObj = errorToObject(error[key], options)
      acc[key] = errorObj
    } else if (
      key === 'stack' &&
      typeof error[key] === 'string' &&
      options?.prettyStack
    ) {
      const stack = error.stack as string
      const stackLines = stack.split('\n')

      stackLines.forEach((line, i) => {
        acc[`stack_${i}`] = line
      })
      delete error.stack
    } else {
      acc[key] = error[key]
    }

    return acc
  }, {})
}

type BestEffortOptions = {
  onError?: (error: unknown) => void
  log?: boolean
}

/**
 * Executes a callback and swallows any errors, logging them instead of throwing.
 * Useful for non-critical operations where failure shouldn't break the flow.
 * Failures are intentionally silent, hence the name "best effort".
 *
 * @param cb - Sync or async callback to execute
 * @param options - Optional settings
 * @param options.onError - Called alongside logging when an error occurs
 * @param options.log - When true, logs errors via `log.error` (default: true)
 * @returns The callback result, or undefined if an error occurred
 */
export function bestEffort<T>(
  cb: () => Promise<T>,
  options?: BestEffortOptions
): Promise<T | undefined>
export function bestEffort<T>(
  cb: () => T,
  options?: BestEffortOptions
): T | undefined
export function bestEffort<T>(
  cb: (() => T) | (() => Promise<T>),
  options?: BestEffortOptions
) {
  const log = options?.log ? createLogger() : undefined

  try {
    const result = cb()

    if (result instanceof Promise) {
      return result
        .then(res => res as T)
        .catch(error => {
          log?.error('[BEST EFFORT (promise)]', errorToObject(error))
          options?.onError?.(error)
        })
    }

    return result
  } catch (error) {
    log?.error('[BEST EFFORT]', errorToObject(error))
    options?.onError?.(error)
  }
}

/**
 * Awaits a promise and returns a tuple instead of throwing, so the caller can
 * handle errors inline without a try/catch block.
 *
 * On success the tuple is `[result, null]`. On failure it is
 * `[null, Error, originalError]`, where the second item is always an `Error`
 * instance (wrapping non-Error throws) and the third item is the raw thrown
 * value.
 *
 * @param {Promise<T>} promise - The promise to await.
 * @returns {Promise<[T, null] | [null, Error, unknown]>} A result/error tuple.
 *
 * @example
 * const [data, error] = await catchy(fetchData())
 * if (error) return // handle the failure
 * // `data` is safe to use here
 */
export async function catchy<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, Error, unknown]> {
  try {
    return [await promise, null]
  } catch (error) {
    return [
      null,
      error instanceof Error ? error : new Error('promise rejected'),
      error,
    ]
  }
}

/**
 * Asserts that a condition is truthy, throwing an error if it's not.
 *
 * @param {unknown} condition - The condition to check.
 * @param {string} message - The error message to throw if the condition is falsy.
 * @throws {Error} Throws an error with the provided message if the condition is falsy.
 */
export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
