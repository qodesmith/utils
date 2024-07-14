/**
 * Massages a float into a consistent decimal format as a string. Examples:
 *
 * - 2.1091 => 2.11
 * - 2.0    => 2
 * - 2.10   => 2.1
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
 * Converts a number of bytes into human-readable text:
 *
 * -
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
