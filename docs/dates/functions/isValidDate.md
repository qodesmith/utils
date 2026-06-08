[@qodestack/utils](../../README.md) / [dates](../README.md) / isValidDate

# Function: isValidDate()

> **isValidDate**(`date`): `boolean`

Defined in: [dates.ts:37](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/dates.ts#L37)

Checks if a value is a valid JavaScript Date object.

## Parameters

### date

`unknown`

The value to check.

## Returns

`boolean`

`true` if the value is a valid Date object, `false` otherwise.

## Example

```ts
// Valid date
isValidDate(new Date()); // true

// Invalid date
isValidDate(new Date('nope')); // false
```
