[@qodestack/utils](../../README.md) / [numbers](../README.md) / secondsToDuration

# Function: secondsToDuration()

> **secondsToDuration**(`totalSeconds`): `string`

Defined in: [numbers.ts:101](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/numbers.ts#L101)

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
