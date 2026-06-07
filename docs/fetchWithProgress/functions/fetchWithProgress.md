[@qodestack/utils](../../README.md) / [fetchWithProgress](../README.md) / fetchWithProgress

# Function: fetchWithProgress()

> **fetchWithProgress**(`input`): `Promise`\<`Response`\>

Defined in: [fetchWithProgress.ts:28](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/fetchWithProgress.ts#L28)

Vanilla `fetch` with the added ability to track progress with a callback.

## Parameters

### input

`FetchWithProgressInput`

The input parameters for the fetch operation.

## Returns

`Promise`\<`Response`\>

- A promise that resolves to the Response object.

## Example

```ts
const url = 'https://example.com/file';
fetchWithProgress({
  url,
  onProgress: (progress) => console.log(`Progress: ${progress}%`),
}).then(response => {
  // Handle the response
});
```
