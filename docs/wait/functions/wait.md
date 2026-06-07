[@qodestack/utils](../../README.md) / [wait](../README.md) / wait

# Function: wait()

> **wait**(`ms`): `Promise`\<`void`\>

Defined in: [wait.ts:11](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/wait.ts#L11)

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
