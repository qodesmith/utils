/**
 * Pluralize a word.
 *
 * ```
 * pluralize(3, 'apple') // '3 apples'
 * pluralize('0', 'apple') // '0 apples'
 * pluralize(1, 'apple') // '1 apple'
 * ```
 */
export function pluralize(amount: number | string, word: string): string {
  const s = +amount === 1 ? '' : 's'
  return `${amount} ${word}${s}`
}
