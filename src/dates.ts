/**
 * Get a date string in a local format, from an optional timezone
 *
 * Example output:
 *
 * `6/13/2024, 9:45:57 AM`
 */
export function getLocalDate(timeZone?: string) {
  return new Date().toLocaleString('en-US', {timeZone})
}
