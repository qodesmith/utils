[@qodestack/utils](../../README.md) / [errors](../README.md) / errorToObject

# Function: errorToObject()

> **errorToObject**(`error`, `options?`): `Record`\<`string`, `unknown`\>

Defined in: [errors.ts:12](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/errors.ts#L12)

Converts an Error object into a plain JavaScript object.
This function is useful for serializing Error objects, which may contain
non-enumerable properties.

## Parameters

### error

`any`

The Error object to convert.

### options?

#### prettyStack

`boolean`

## Returns

`Record`\<`string`, `unknown`\>

A plain object representation of the Error.
