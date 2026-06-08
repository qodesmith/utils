[@qodestack/utils](../../README.md) / [timing](../README.md) / wait

# Function: wait()

> **wait**(`ms`): `Promise`\<`void`\>

Defined in: timing.ts:11

Waits for a specified number of milliseconds before resolving.

## Parameters

### ms

`number`

The number of milliseconds to wait.

## Returns

`Promise`\<`void`\>

A Promise that resolves after the specified delay.

## Example

```ts
// Wait for 2 seconds
await wait(2000);
```
