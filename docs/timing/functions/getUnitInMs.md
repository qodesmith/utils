[@qodestack/utils](../../README.md) / [timing](../README.md) / getUnitInMs

# Function: getUnitInMs()

> **getUnitInMs**(`quantity`, `unit`, `isLeapYear?`): `number`

Defined in: timing.ts:107

Converts a given quantity of time into milliseconds based on the specified
unit.

## Parameters

### quantity

`number`

The amount of time to convert.

### unit

`"s"` \| `"m"` \| `"h"` \| `"d"` \| `"w"` \| `"y"`

The unit of time to convert from.
  - `s` for seconds
  - `m` for minutes
  - `h` for hours
  - `d` for days
  - `w` for weeks
  - `y` for years

### isLeapYear?

`boolean`

Whether to calculate year as leap year (366 days) or regular year (365 days). Only affects 'y' unit.

## Returns

`number`

The equivalent time in milliseconds.

## Example

```ts
getUnitInMs(1, 's') // 1000
getUnitInMs(1, 'm') // 60000
getUnitInMs(1, 'h') // 3600000
getUnitInMs(1, 'd') // 86400000
getUnitInMs(1, 'w') // 604800000
getUnitInMs(1, 'y') // 31536000000 (365 days)
getUnitInMs(1, 'y', true) // 31622400000 (366 days)
```
