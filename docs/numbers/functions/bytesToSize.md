[@qodestack/utils](../../README.md) / [numbers](../README.md) / bytesToSize

# Function: bytesToSize()

> **bytesToSize**(`bytes`): `string`

Defined in: [numbers.ts:53](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/numbers.ts#L53)

Converts a number of bytes into a human-readable string representation.
Uses the most appropriate unit (GB, MB, KB, or bytes) based on the size.

## Parameters

### bytes

`number`

The number of bytes to convert.

## Returns

`string`

A string representing the size in the most appropriate unit (GB, MB, KB, or bytes).

## Example

```ts
bytesToSize(1500000); // "1.43 MB"
bytesToSize(1024);    // "1 KB"
bytesToSize(1);       // "1 byte"
bytesToSize(0);       // "0 bytes"
```
