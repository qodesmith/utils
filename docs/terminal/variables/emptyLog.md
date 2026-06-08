[@qodestack/utils](../../README.md) / [terminal](../README.md) / emptyLog

# Variable: emptyLog

> `const` **emptyLog**: `object`

Defined in: terminal.ts:98

A convenience export so consumers can implement a conditional "silent" logger
without having to stub this object themselves, leaving the business logic
untouched.

Example:

```
import {log, emptyLog} from '@qodesmith/utils'

const logger = silent ? emptyLog : log

// Business logic...
logger.text('Hello world!')
```

## Type Declaration

### error()

> **error**(...`_items`): `void`

#### Parameters

##### \_items

...`any`[]

#### Returns

`void`

### success()

> **success**(...`_items`): `void`

#### Parameters

##### \_items

...`any`[]

#### Returns

`void`

### text()

> **text**(...`_items`): `void`

#### Parameters

##### \_items

...`any`[]

#### Returns

`void`

### warning()

> **warning**(...`_items`): `void`

#### Parameters

##### \_items

...`any`[]

#### Returns

`void`
