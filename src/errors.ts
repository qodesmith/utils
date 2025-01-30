import {isPlainObject} from './objects'

/**
 * Converts an Error object into a plain JavaScript object.
 * This function is useful for serializing Error objects, which may contain
 * non-enumerable properties.
 *
 * @param {any} error - The Error object to convert.
 * @returns {Record<string, unknown>} A plain object representation of the Error.
 */
export function errorToObject(
  error: any,
  options?: {prettyStack: boolean}
): Record<string, unknown> {
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
