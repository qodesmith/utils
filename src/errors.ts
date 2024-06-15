export function errorToObject(error: any): Record<string, unknown> {
  return Object.getOwnPropertyNames(error).reduce<Record<string, unknown>>(
    (acc, key) => {
      acc[key] = error[key]
      return acc
    },
    {}
  )
}
