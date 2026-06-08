[@qodestack/utils](../../README.md) / [timing](../README.md) / secondsToDuration

# Function: secondsToDuration()

> **secondsToDuration**(`totalSeconds`): `string`

Defined in: timing.ts:61

Converts a number of seconds into a formatted duration string, separated by
colons.

## Parameters

### totalSeconds

`number`

The total number of seconds to convert

## Returns

`string`

A formatted string representing the duration in hours:minutes:seconds or minutes:seconds

## Example

```ts
secondsToDuration(24) // '0:24'
secondsToDuration(60) // '1:00'
secondsToDuration(3600) // '1:00:00'
secondsToDuration(24 * 60 * 60 * 2 + 1) // '48:00:01'
```
