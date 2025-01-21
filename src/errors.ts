/**
 * Converts an Error object into a plain JavaScript object.
 * This function is useful for serializing Error objects, which may contain
 * non-enumerable properties.
 *
 * @param {any} error - The Error object to convert.
 * @returns {Record<string, unknown>} A plain object representation of the Error.
 */
export function errorToObject(error: any): Record<string, unknown> {
  return Object.getOwnPropertyNames(error).reduce<Record<string, unknown>>(
    (acc, key) => {
      // The `cause` property may be an error object as well.
      if (error[key] instanceof Error) {
        const errorObj = errorToObject(error[key])
        acc[key] = errorObj
      } else {
        acc[key] = error[key]
      }

      return acc
    },
    {}
  )
}
