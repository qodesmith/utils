[@qodestack/utils](../../README.md) / [errors](../README.md) / errorToObject

# Function: errorToObject()

> **errorToObject**(`error`, `options?`): `Record`\<`string`, `unknown`\>

Defined in: [errors.ts:12](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/errors.ts#L12)

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
