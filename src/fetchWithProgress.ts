type FetchWithProgressInput = {
  url: string
  onProgress: (progressPercent: number) => void
  contentLengthHeader?: string
  options?: Parameters<typeof fetch>[1]
}

/**
 * Vanilla `fetch` with the added ability to track progress with a callback.
 *
 * @param {FetchWithProgressInput} input - The input parameters for the fetch operation.
 * @param {string} input.url - The URL to fetch.
 * @param {function} input.onProgress - Callback function to track progress, receives a percentage.
 * @param {string} [input.contentLengthHeader] - Optional custom header name for content length. Defaults to `Content-Length`.
 * @param {object} [input.options] - Optional fetch options. Defaults to `undefined`.
 *
 * @returns {Promise<Response>} - A promise that resolves to the Response object.
 *
 * @example
 * const url = 'https://example.com/file';
 * fetchWithProgress({
 *   url,
 *   onProgress: (progress) => console.log(`Progress: ${progress}%`),
 * }).then(response => {
 *   // Handle the response
 * });
 */
export async function fetchWithProgress({
  url,
  onProgress,
  contentLengthHeader,
  options,
}: FetchWithProgressInput): Promise<Response> {
  const response = await fetch(url, options)
  const reader = response.body?.getReader()

  if (!reader) {
    throw new Error('No readable stream found')
  }

  const contentLengthHeaderName = contentLengthHeader ?? 'Content-Length'

  // If a header name was provided but still not found, default to `Content-Length`
  const contentLengthHeaderValue =
    response.headers.get(contentLengthHeaderName) ??
    response.headers.get('Content-Length')

  if (!contentLengthHeaderValue) {
    throw new Error(`No ${contentLengthHeaderName} header found`)
  }

  const contentLength = +contentLengthHeaderValue
  if (Number.isNaN(contentLength)) {
    throw new Error(`${contentLengthHeaderName} is not a number`)
  }

  // Bytes received
  let receivedLength = 0

  // Array of received binary chunks (comprises the body)
  const chunks: (Uint8Array | undefined)[] = []

  while (true) {
    const {done, value} = (await reader?.read()) ?? {}
    if (done) break

    chunks.push(value)
    receivedLength += value?.length ?? 0

    const currentPercent = (receivedLength / contentLength) * 100
    const progressPercent = Math.min(100, currentPercent)

    onProgress(progressPercent)
  }

  // Concatenate chunks into single Uint8Array
  const finalData = new Uint8Array(receivedLength)
  let position = 0

  chunks.forEach(chunk => {
    if (chunk) {
      finalData.set(chunk, position)
      position += chunk.length
    }
  })

  return new Response(finalData)
}
