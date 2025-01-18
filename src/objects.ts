export function isPlainObject(value: any): value is Record<string, unknown> {
  // Check if the value is an object and not null
  if (typeof value !== 'object' || value === null) {
    return false
  }

  // Check if the object is a plain object
  const proto = Object.getPrototypeOf(value)

  return proto === Object.prototype || proto === null
}
