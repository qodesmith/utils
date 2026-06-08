[@qodestack/utils](../../README.md) / [errors](../README.md) / invariant

# Function: invariant()

> **invariant**(`condition`, `message`): `asserts condition`

Defined in: [errors.ts:138](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/errors.ts#L138)

Asserts that a condition is truthy, throwing an error if it's not.

## Parameters

### condition

`unknown`

The condition to check.

### message

`string`

The error message to throw if the condition is falsy.

## Returns

`asserts condition`

## Throws

Throws an error with the provided message if the condition is falsy.
