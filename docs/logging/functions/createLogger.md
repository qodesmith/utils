[@qodestack/utils](../../README.md) / [logging](../README.md) / createLogger

# Function: createLogger()

> **createLogger**(`options?`): `object`

Defined in: [logging.ts:53](https://github.com/qodesmith/utils/blob/454dfeeb7b8c144bcc13726c63d1753237871405/src/logging.ts#L53)

Creates a logger object with colored and timestamped logging methods.

Each log line is preceded by a date in the form of `[6/13/2024, 9:45:57 AM]`.
Objects are not colored and are logged as is.

The following methods are available:

`text`: The same a `console.log`. No color output is applied.

`success`: A green (or aqua) color is applied to the log.

`error`: A red color is applied to the log.

`warning`: A yellow color is applied to the log.

## Parameters

### options?

The options for creating the logger.

#### includeTime?

`boolean` = `true`

#### timeZone?

`string`

The time zone to use for timestamps.

## Returns

`object`

An object with logging methods: `text`, `success`, `error`, and `warning`.

### error()

> **error**(...`items`): `void`

#### Parameters

##### items

...`any`[]

#### Returns

`void`

### success()

> **success**(...`items`): `void`

#### Parameters

##### items

...`any`[]

#### Returns

`void`

### text()

> **text**(...`items`): `void`

#### Parameters

##### items

...`any`[]

#### Returns

`void`

### warning()

> **warning**(...`items`): `void`

#### Parameters

##### items

...`any`[]

#### Returns

`void`

## Example

```ts
log.text('Hello!') // `[6/13/2024, 9:45:57 AM] Hello!`
```
