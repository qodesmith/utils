/**
 * Get a date string in a local format, from an optional timezone
 *
 * Example output:
 *
 * `6/13/2024, 9:45:57 AM`
 */

/**
 * Returns the current date and time as a string in the local format.
 *
 * @param {string} [timeZone] - The optional time zone to use for formatting the date.
 * @returns {string} A string representing the current date and time in the local format.
 * @example
 * // Get the local date in the default time zone
 * getLocalDate(); // "10/5/2024, 7:15:50 AM"
 *
 * // Get the local date in a specific time zone
 * getLocalDate('Europe/London'); // "10/5/2024, 12:15:50 PM"
 */
export function getLocalDate(timeZone?: string) {
  return new Date().toLocaleString('en-US', {timeZone})
}

/**
 * Checks if a value is a valid JavaScript Date object.
 *
 * @param {unknown} date - The value to check.
 * @returns {boolean} `true` if the value is a valid Date object, `false` otherwise.
 * @example
 * // Valid date
 * isValidDate(new Date()); // true
 *
 * // Invalid date
 * isValidDate(new Date('nope')); // false
 */
export function isValidDate(date: unknown): boolean {
  if (!(date instanceof Date)) {
    return false
  }

  return !Number.isNaN(date.getTime())
}
