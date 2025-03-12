# @createdbyjurand/status-codes

A comprehensive HTTP status codes enum for TypeScript and JavaScript projects.

## Installation

```bash
npm i @createdbyjurand/status-codes
```

## Usage

```typescript
import {EStatusCode, statusCodeNames, isValidStatusCode} from '@createdbyjurand/status-codes';

// Using status code enum
if (response.status === EStatusCode.SUCCESS_OK) {
  console.log('Request successful!');
}

// Getting status code name
const statusName = statusCodeNames[200]; // "Ok"

// Validating status codes
if (isValidStatusCode(404)) {
  console.log('Valid status code');
}
```

## Available Status Codes

The enum provides comprehensive HTTP status codes categorized as:

- INFO (100-103)
- SUCCESS (200-226)
- REDIRECT (300-308)
- CLIENT_ERROR (400-499)
- SERVER_ERROR (500-599)

## License

MIT
