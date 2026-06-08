[@qodestack/utils](../../README.md) / [arrays](../README.md) / shuffleArray

# Function: shuffleArray()

> **shuffleArray**\<`T`\>(`array`): `T`[]

Defined in: [arrays.ts:44](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/arrays.ts#L44)

Shuffles the elements of an array randomly.

## Type Parameters

### T

`T`

## Parameters

### array

`T`[] \| readonly `T`[]

The array to be shuffled.

## Returns

`T`[]

A new array with the same elements in a random order.

## Example

```ts
const arr = [1, 2, 3, 4, 5];
const shuffledArr = shuffleArray(arr); // [3, 1, 5, 2, 4] (random order)
```
