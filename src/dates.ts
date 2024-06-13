export function getLocalDate(timeZone?: string) {
  return new Date().toLocaleString('en-US', {timeZone})
}
