/**
 * Formats a floating-point number to a consistent decimal representation as a
 * string. Trims trailing zeros and removes unnecessary decimal points.
 *
 * @param {number} num - The number to format.
 * @returns {string} The formatted number as a string.
 *
 * @example
 * sanitizeDecimal(2.1091); // "2.11"
 * sanitizeDecimal(2.0);    // "2"
 * sanitizeDecimal(2.10);   // "2.1"
 */
export function sanitizeDecimal(num: number): string {
  return (
    num
      .toFixed(2)
      /**
       * `(\.\d*?)` - captures the decimal point `\.` followed by zero or more
       *              digits `\d*`, but it does so non-greedily due to the `?`
       *              after the `*`. This means it captures the smallest
       *              possible sequence of digits after the decimal point. This
       *              part is enclosed in parentheses to create a capturing
       *              group. The captured content will be referred to as `$1` in
       *              the replacement string.
       * `0*$`      - This part matches zero or more zeros `0*` that appear at
       *              the end of the string `$`.
       * `'$1'`     - Refers to the content captured by the first capturing
       *              group.
       */
      .replace(/(\.\d*?)0*$/, '$1')
      /**
       * `\.$`      - Remove any trailing period that might be present after the
       *              zeros are removed. It matches a period at the end of the
       *              string and replaces it with an empty string.
       */
      .replace(/\.$/, '')
  )
}

/**
 * Converts a number of bytes into a human-readable string representation.
 * Uses the most appropriate unit (GB, MB, KB, or bytes) based on the size.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @returns {string} A string representing the size in the most appropriate unit (GB, MB, KB, or bytes).
 *
 * @example
 * bytesToSize(1500000); // "1.43 MB"
 * bytesToSize(1024);    // "1 KB"
 * bytesToSize(1);       // "1 byte"
 * bytesToSize(0);       // "0 bytes"
 */
export function bytesToSize(bytes: number): string {
  if (bytes >= 1073741824) {
    return sanitizeDecimal(bytes / 1073741824) + ' GB'
  } else if (bytes >= 1048576) {
    return sanitizeDecimal(bytes / 1048576) + ' MB'
  } else if (bytes >= 1024) {
    return sanitizeDecimal(bytes / 1024) + ' KB'
  } else if (bytes > 1) {
    return bytes + ' bytes'
  } else if (bytes == 1) {
    return bytes + ' byte'
  } else {
    return '0 bytes'
  }
}

/**
 * Generates a random number between the specified minimum and maximum values, inclusive.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random number between min and max, inclusive.
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Converts a number of seconds into a formatted duration string, separated by
 * colons.
 *
 * @param {number} totalSeconds - The total number of seconds to convert
 * @returns {string} A formatted string representing the duration in hours:minutes:seconds or minutes:seconds
 *
 * @example
 * secondsToDuration(24) // '0:24'
 * secondsToDuration(60) // '1:00'
 * secondsToDuration(3600) // '1:00:00'
 * secondsToDuration(24 * 60 * 60 * 2 + 1) // '48:00:01'
 */
export function secondsToDuration(totalSeconds: number): string {
  // Ensure the input is a non-negative integer
  const seconds = Math.max(0, Math.floor(totalSeconds))

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Format seconds to always have two digits
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  // If there are hours, include them in the format
  if (hours > 0) {
    // Only force minutes to have two digits when hours are present
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${hours}:${formattedMinutes}:${formattedSeconds}`
  }

  // If no hours, just return minutes and seconds
  return `${minutes}:${formattedSeconds}`
}
