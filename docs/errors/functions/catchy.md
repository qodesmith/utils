[@qodestack/utils](../../README.md) / [errors](../README.md) / catchy

# Function: catchy()

> **catchy**\<`T`\>(`promise`): `Promise`\<\[`T`, `null`\] \| \[`null`, `Error`, `unknown`\]\>

Defined in: [errors.ts:117](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/errors.ts#L117)

Awaits a promise and returns a tuple instead of throwing, so the caller can
handle errors inline without a try/catch block.

On success the tuple is `[result, null]`. On failure it is
`[null, Error, originalError]`, where the second item is always an `Error`
instance (wrapping non-Error throws) and the third item is the raw thrown
value.

## Type Parameters

### T

`T`

## Parameters

### promise

`Promise`\<`T`\>

The promise to await.

## Returns

`Promise`\<\[`T`, `null`\] \| \[`null`, `Error`, `unknown`\]\>

A result/error tuple.

## Example

```ts
const [data, error] = await catchy(fetchData())
if (error) return // handle the failure
// `data` is safe to use here
```
