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
      acc[key] = error[key]
      return acc
    },
    {}
  )
}
