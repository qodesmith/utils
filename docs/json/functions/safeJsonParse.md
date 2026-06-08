[@qodestack/utils](../../README.md) / [json](../README.md) / safeJsonParse

# Function: safeJsonParse()

## Call Signature

> **safeJsonParse**\<`T`\>(`jsonString`): `T` \| `undefined`

Defined in: [json.ts:19](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/json.ts#L19)

Safely parses a JSON string, returning a default value if parsing fails.

### Type Parameters

#### T

`T`

### Parameters

#### jsonString

`string`

The JSON string to parse.

### Returns

`T` \| `undefined`

The parsed object of type T, or the default value if parsing fails.

## Call Signature

> **safeJsonParse**\<`T`\>(`jsonString`, `defaultValue`): `T`

Defined in: [json.ts:20](https://github.com/qodesmith/utils/blob/c8fab201f6be19f3a72a76d2430b77244cece7bb/src/json.ts#L20)

Safely parses a JSON string, returning a default value if parsing fails.

### Type Parameters

#### T

`T`

### Parameters

#### jsonString

`string`

The JSON string to parse.

#### defaultValue

`T`

The value to return if parsing fails.

### Returns

`T`

The parsed object of type T, or the default value if parsing fails.
