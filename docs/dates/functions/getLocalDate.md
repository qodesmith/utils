[@qodestack/utils](../../README.md) / [dates](../README.md) / getLocalDate

# Function: getLocalDate()

> **getLocalDate**(`timeZone?`): `string`

Defined in: [dates.ts:21](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/dates.ts#L21)

Returns the current date and time as a string in the local format.

## Parameters

### timeZone?

`string`

The optional time zone to use for formatting the date.

## Returns

`string`

A string representing the current date and time in the local format.

## Example

```ts
// Get the local date in the default time zone
getLocalDate(); // "10/5/2024, 7:15:50 AM"

// Get the local date in a specific time zone
getLocalDate('Europe/London'); // "10/5/2024, 12:15:50 PM"
```
