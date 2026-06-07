[@qodestack/utils](../../README.md) / [numbers](../README.md) / getUnitInSeconds

# Function: getUnitInSeconds()

> **getUnitInSeconds**(`quantity`, `unit`, `isLeapYear?`): `number`

Defined in: [numbers.ts:193](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/numbers.ts#L193)

Converts a given quantity of time into seconds based on the specified unit.

## Parameters

### quantity

`number`

The amount of time to convert.

### unit

`"m"` \| `"h"` \| `"d"` \| `"w"` \| `"y"` \| `"ms"`

The unit of time to convert from.
  - `ms` for milliseconds
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

The equivalent time in seconds.

## Example

```ts
getUnitInSeconds(1000, 'ms') // 1
getUnitInSeconds(1, 'm') // 60
getUnitInSeconds(1, 'h') // 3600
getUnitInSeconds(1, 'd') // 86400
getUnitInSeconds(1, 'w') // 604800
getUnitInSeconds(1, 'y') // 31536000 (365 days)
getUnitInSeconds(1, 'y', true) // 31622400 (366 days)
```
