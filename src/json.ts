/**
 * Safely parses a JSON string, returning a default value if parsing fails.
 *
 * @param jsonString - The JSON string to parse.
 * @param defaultValue - The value to return if parsing fails.
 * @returns The parsed object of type T, or the default value if parsing fails.
 */
export function safeJsonParse<T>(jsonString: string): T | undefined
export function safeJsonParse<T>(jsonString: string, defaultValue: T): T
export function safeJsonParse<T>(
  jsonString: string,
  defaultValue?: T
): T | undefined {
  try {
    return JSON.parse(jsonString) as T
  } catch {
    return defaultValue
  }
}
