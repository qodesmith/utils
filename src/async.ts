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
