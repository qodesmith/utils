[@qodestack/utils](../../README.md) / [arrays](../README.md) / chunkArray

# Function: chunkArray()

> **chunkArray**\<`T`\>(`arr`, `size`): `T`[][]

Defined in: [arrays.ts:15](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/arrays.ts#L15)

Chunks an array into smaller arrays of a specified size.
Works with regular arrays and TypedArrays.

## Type Parameters

### T

`T`

## Parameters

### arr

`ArrayLike`\<`T`\>

The array to be chunked.

### size

`number`

The size of each chunk.

## Returns

`T`[][]

An array of chunked arrays.

## Example

```ts
const arr = [1, 2, 3, 4, 5, 6];
const newArr = chunkArray(arr, 2); // [[1, 2], [3, 4], [5, 6]]
```
