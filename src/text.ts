/**
 * Pluralizes a word based on the given amount.
 *
 * @param {number|string} amount - The quantity to determine pluralization
 * @param {string} word - The word to be pluralized
 * @returns {string} A string combining the amount and the pluralized word
 *
 * @example
 * pluralize(3, 'apple') // '3 apples'
 * pluralize('0', 'apple') // '0 apples'
 * pluralize(1, 'apple') // '1 apple'
 */
export function pluralize(amount: number | string, word: string): string {
  const s = +amount === 1 ? '' : 's'
  return `${amount} ${word}${s}`
}

/**
 * Provides BASIC slug creation functionality. The result is a url-safe string
 * with the following rules:
 * - Upper and lowercase letters allowed
 * - Numbers allowed
 * - `-_.~` are the only special characters allowed
 * - Leading and trailing spaces are trimmed
 * - Spaces are converted to `-`
 * - Consecutive `-` will be reduced to a single `-`
 *
 * @param {string} text - The string to slugify
 * @returns {string} A slugified string
 *
 * @example
 * slugify('Hello world!') // 'Hello-world'
 * slugify('    ----This   is!@#$%^&a test  ') // '-This-isa-test'
 */
export function slugify(text: string): string {
  return (
    text
      // Remove any character that is not a letter, number, space, or -_.~
      .replace(/[^a-zA-Z0-9-_.~ ]/g, '')

      // Get rid of leading and trailing spaces
      .trim()

      // Replace spaces with hyphens
      .replace(/\s+/g, '-')

      // Replace consecutive hyphens with a single hyphen
      .replace(/-+/g, '-')
  )
}
