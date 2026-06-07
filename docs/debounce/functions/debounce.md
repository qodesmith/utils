[@qodestack/utils](../../README.md) / [debounce](../README.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`func`, `wait`): (...`args`) => `void`

Defined in: [debounce.ts:17](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/debounce.ts#L17)

Creates a debounced version of the provided function.

This function returns a new function that, when invoked, will delay the
execution of the original function until after `wait` milliseconds have
elapsed since the last time it was invoked. This is useful for implementing
behavior that should only happen after a repeated action has completed.

## Type Parameters

### T

`T` *extends* (...`args`) => `void`

## Parameters

### func

`T`

The function to debounce.

### wait

`number`

The number of milliseconds to delay.

## Returns

A debounced version of the input function.

(...`args`) => `void`

## Example

```ts
// `searchFunction` will be called a max every 300ms.
const debouncedSearch = debounce(searchFunction, 300);
```
