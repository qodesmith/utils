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

/**
 * Convert seconds to a time duration separated by colons. Only goes up to
 * hours, does not show days.
 *
 * ```
 * secondsToDuration(24) => '0:24'
 * secondsToDuration(60) => '1:00'
 * secondsToDuration(3600) => '1:00:00'
 * secondsToDuration(24 * 60 * 60 * 2 + 1) => '48:00:01'
 * ```
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
