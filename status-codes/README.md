# @createdbyjurand/status-codes

A comprehensive HTTP status codes enum for TypeScript and JavaScript projects.

&nbsp;

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Status Code Enum](#status-code-enum)
  - [Status Code Names](#status-code-names)
  - [Validation Functions](#validation-functions)
  - [Specific Status Checks](#specific-status-checks)
  - [Reverse Lookup](#reverse-lookup)
- [Available Functions](#available-functions)
- [Available Status Codes](#available-status-codes)
- [Status Code Names Reference](#status-code-names-reference)
  - [Complete List of Status Code Names](#complete-list-of-status-code-names)
- [License](#license)
- [Changelog](#changelog)
  - [4.0.0 (2024-03-14)](#400-2024-03-14)
  - [3.0.0 (2023-12-15)](#300-2023-12-15)
  - [2.0.0 (2023-06-20)](#200-2023-06-20)
  - [1.0.0 (2023-01-10)](#100-2023-01-10)

&nbsp;

## Installation

[Back to top](#table-of-contents)

```bash
npm i @createdbyjurand/status-codes
```

&nbsp;

## Usage

[Back to top](#table-of-contents)

```typescript
import {
  StatusCode,
  statusCodeNames,
  isValidStatusCode,
  isSuccess,
  isClientError,
  isServerError,
  isNotFound,
  getStatusCodeByName,
} from '@createdbyjurand/status-codes';
```

&nbsp;

### Status Code Enum

```typescript
// Using status code enum
if (response.status === StatusCode.SUCCESS_OK) {
  console.log('Request successful!');
}
```

&nbsp;

### Status Code Names

```typescript
// Getting status code name
const statusName = statusCodeNames[200]; // "Ok"
```

&nbsp;

### Validation Functions

```typescript
// Validating status codes
if (isValidStatusCode(404)) {
  console.log('Valid status code');
}

// Category checking
if (isSuccess(response.status)) {
  console.log('Request was successful');
}

if (isClientError(response.status)) {
  console.log('Client made an error');
}

if (isServerError(response.status)) {
  console.log('Server encountered an error');
}
```

&nbsp;

### Specific Status Checks

```typescript
// Check for specific conditions
if (isNotFound(response.status)) {
  console.log('Resource not found');
}

if (requiresAuthentication(response.status)) {
  console.log('Authentication required');
}

if (isRateLimited(response.status)) {
  console.log('Rate limit exceeded');
}
```

&nbsp;

### Reverse Lookup

```typescript
// Get status code from its name
const code = getStatusCodeByName('Not Found'); // Returns 404
```

&nbsp;

## Available Functions

[Back to top](#table-of-contents)

| Function                       | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `isValidStatusCode(code)`      | Checks if a code is a valid HTTP status code             |
| `isInformational(code)`        | Checks if status code is informational (100-199)         |
| `isSuccess(code)`              | Checks if status code indicates success (200-299)        |
| `isRedirect(code)`             | Checks if status code indicates redirection (300-399)    |
| `isClientError(code)`          | Checks if status code indicates client error (400-499)   |
| `isServerError(code)`          | Checks if status code indicates server error (500-599)   |
| `requiresAuthentication(code)` | Checks if status code requires authentication (401)      |
| `isNotFound(code)`             | Checks if status code indicates resource not found (404) |
| `isRateLimited(code)`          | Checks if status code indicates rate limiting (429)      |
| `getStatusCodeByName(name)`    | Get status code by name (case insensitive)               |

&nbsp;

## Available Status Codes

[Back to top](#table-of-contents)

The enum provides comprehensive HTTP status codes:

```typescript
export enum StatusCode {
  /* 1   ********* INFO *********/
  /* 100 */ INFO_CONTINUE = 100,
  /* 101 */ INFO_SWITCHING_PROTOCOLS = 101,
  /* 102 */ INFO_PROCESSING = 102,
  /* 103 */ INFO_EARLY_HINTS = 103, // Experimental
  /* 2   ********* SUCCESS *********/
  /* 200 */ SUCCESS_OK = 200,
  /* 201 */ SUCCESS_CREATED = 201,
  /* 202 */ SUCCESS_ACCEPTED = 202,
  /* 203 */ SUCCESS_NON_AUTHORITATIVE_INFORMATION = 203,
  /* 204 */ SUCCESS_NO_CONTENT = 204,
  /* 205 */ SUCCESS_RESET_CONTENT = 205,
  /* 206 */ SUCCESS_PARTIAL_CONTENT = 206,
  /* 207 */ SUCCESS_MULTI_STATUS = 207,
  /* 208 */ SUCCESS_ALREADY_REPORTED = 208,
  /* 226 */ SUCCESS_IM_USED = 226,
  /* 3   ********* REDIRECT *********/
  /* 300 */ REDIRECT_MULTIPLE_CHOICES = 300,
  /* 301 */ REDIRECT_MOVED_PERMANENTLY = 301,
  /* 302 */ REDIRECT_FOUND = 302, // Previously "MOVED_TEMPORARILY"
  /* 303 */ REDIRECT_SEE_OTHER = 303,
  /* 304 */ REDIRECT_NOT_MODIFIED = 304,
  /* 305 */ REDIRECT_USE_PROXY = 305,
  /* 306 */ REDIRECT_SWITCH_PROXY = 306,
  /* 307 */ REDIRECT_TEMPORARY_REDIRECT = 307,
  /* 308 */ REDIRECT_PERMANENT_REDIRECT = 308,
  /* 4   ********* CLIENT_ERROR *********/
  /* 400 */ CLIENT_ERROR_BAD_REQUEST = 400,
  /* 401 */ CLIENT_ERROR_UNAUTHORIZED = 401,
  /* 402 */ CLIENT_ERROR_PAYMENT_REQUIRED = 402,
  /* 403 */ CLIENT_ERROR_FORBIDDEN = 403,
  /* 404 */ CLIENT_ERROR_NOT_FOUND = 404,
  /* 405 */ CLIENT_ERROR_METHOD_NOT_ALLOWED = 405,
  /* 406 */ CLIENT_ERROR_NOT_ACCEPTABLE = 406,
  /* 407 */ CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED = 407,
  /* 408 */ CLIENT_ERROR_REQUEST_TIMEOUT = 408,
  /* 409 */ CLIENT_ERROR_CONFLICT = 409,
  /* 410 */ CLIENT_ERROR_GONE = 410,
  /* 411 */ CLIENT_ERROR_LENGTH_REQUIRED = 411,
  /* 412 */ CLIENT_ERROR_PRECONDITION_FAILED = 412,
  /* 413 */ CLIENT_ERROR_PAYLOAD_TOO_LARGE = 413,
  /* 414 */ CLIENT_ERROR_URI_TOO_LONG = 414,
  /* 415 */ CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE = 415,
  /* 416 */ CLIENT_ERROR_RANGE_NOT_SATISFIABLE = 416,
  /* 417 */ CLIENT_ERROR_EXPECTATION_FAILED = 417,
  /* 418 */ CLIENT_ERROR_IM_A_TEAPOT = 418,
  /* 420 */ CLIENT_ERROR_ENHANCE_YOUR_CALM = 420, // Non-standard, specific to Twitter
  /* 421 */ CLIENT_ERROR_MISDIRECTED_REQUEST = 421,
  /* 422 */ CLIENT_ERROR_UNPROCESSABLE_ENTITY = 422,
  /* 423 */ CLIENT_ERROR_LOCKED = 423,
  /* 424 */ CLIENT_ERROR_FAILED_DEPENDENCY = 424,
  /* 425 */ CLIENT_ERROR_TOO_EARLY = 425,
  /* 426 */ CLIENT_ERROR_UPGRADE_REQUIRED = 426,
  /* 428 */ CLIENT_ERROR_PRECONDITION_REQUIRED = 428,
  /* 429 */ CLIENT_ERROR_TOO_MANY_REQUESTS = 429,
  /* 431 */ CLIENT_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  /* 440 */ CLIENT_ERROR_LOGIN_TIME_OUT = 440, // Non-standard, specific to Microsoft IIS
  /* 444 */ CLIENT_ERROR_NO_RESPONSE = 444, // Non-standard, specific to Nginx
  /* 449 */ CLIENT_ERROR_RETRY_WITH = 449, // Non-standard, specific to Microsoft IIS
  /* 450 */ CLIENT_ERROR_BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS = 450, // Non-standard, specific to Microsoft IIS
  /* 451 */ CLIENT_ERROR_UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  /* 499 */ CLIENT_ERROR_CLIENT_CLOSED_REQUEST = 499,
  /* 5   ********* SERVER_ERROR *********/
  /* 500 */ SERVER_ERROR_INTERNAL_SERVER_ERROR = 500,
  /* 501 */ SERVER_ERROR_NOT_IMPLEMENTED = 501,
  /* 502 */ SERVER_ERROR_BAD_GATEWAY = 502,
  /* 503 */ SERVER_ERROR_SERVICE_UNAVAILABLE = 503,
  /* 504 */ SERVER_ERROR_GATEWAY_TIMEOUT = 504,
  /* 505 */ SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED = 505,
  /* 506 */ SERVER_ERROR_VARIANT_ALSO_NEGOTIATES = 506,
  /* 507 */ SERVER_ERROR_INSUFFICIENT_STORAGE = 507,
  /* 508 */ SERVER_ERROR_LOOP_DETECTED = 508,
  /* 509 */ SERVER_ERROR_BANDWIDTH_LIMIT_EXCEEDED = 509, // Non-standard, hosting-specific
  /* 510 */ SERVER_ERROR_NOT_EXTENDED = 510,
  /* 511 */ SERVER_ERROR_NETWORK_AUTHENTICATION_REQUIRED = 511,
  /* 598 */ SERVER_ERROR_NETWORK_READ_TIMEOUT = 598, // Non-standard, proxy-specific
  /* 599 */ SERVER_ERROR_NETWORK_CONNECT_TIMEOUT = 599, // Non-standard, proxy-specific
}
```

&nbsp;

## Status Code Names Reference

[Back to top](#table-of-contents)

> `statusCodeNames` is an object that holds mirrored enum data where key is a status code number and value is human readable status name.

```typescript
export const statusCodeNames: Record<number, string> = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [
    value,
    key
      .replace(/^(INFO_|SUCCESS_|REDIRECT_|CLIENT_ERROR_|SERVER_ERROR_)/, '') // Remove category prefixes
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase() // Convert to lowercase
      .replace(/\b\w/g, char => char.toUpperCase()), // Capitalize each word
  ]),
);
```

&nbsp;

### Complete List of Status Code Names

Here's a complete example showing all status code names from the `statusCodeNames` object:

```typescript
import {statusCodeNames} from '@createdbyjurand/status-codes';

// Information responses (100-199)
console.log(statusCodeNames[100]); // "Continue"
console.log(statusCodeNames[101]); // "Switching Protocols"
console.log(statusCodeNames[102]); // "Processing"
console.log(statusCodeNames[103]); // "Early Hints"

// Success responses (200-299)
console.log(statusCodeNames[200]); // "Ok"
console.log(statusCodeNames[201]); // "Created"
console.log(statusCodeNames[202]); // "Accepted"
console.log(statusCodeNames[203]); // "Non Authoritative Information"
console.log(statusCodeNames[204]); // "No Content"
console.log(statusCodeNames[205]); // "Reset Content"
console.log(statusCodeNames[206]); // "Partial Content"
console.log(statusCodeNames[207]); // "Multi Status"
console.log(statusCodeNames[208]); // "Already Reported"
console.log(statusCodeNames[226]); // "Im Used"

// Redirection responses (300-399)
console.log(statusCodeNames[300]); // "Multiple Choices"
console.log(statusCodeNames[301]); // "Moved Permanently"
console.log(statusCodeNames[302]); // "Found"
console.log(statusCodeNames[303]); // "See Other"
console.log(statusCodeNames[304]); // "Not Modified"
console.log(statusCodeNames[305]); // "Use Proxy"
console.log(statusCodeNames[306]); // "Switch Proxy"
console.log(statusCodeNames[307]); // "Temporary Redirect"
console.log(statusCodeNames[308]); // "Permanent Redirect"

// Client error responses (400-499)
console.log(statusCodeNames[400]); // "Bad Request"
console.log(statusCodeNames[401]); // "Unauthorized"
console.log(statusCodeNames[402]); // "Payment Required"
console.log(statusCodeNames[403]); // "Forbidden"
console.log(statusCodeNames[404]); // "Not Found"
console.log(statusCodeNames[405]); // "Method Not Allowed"
console.log(statusCodeNames[406]); // "Not Acceptable"
console.log(statusCodeNames[407]); // "Proxy Authentication Required"
console.log(statusCodeNames[408]); // "Request Timeout"
console.log(statusCodeNames[409]); // "Conflict"
console.log(statusCodeNames[410]); // "Gone"
console.log(statusCodeNames[411]); // "Length Required"
console.log(statusCodeNames[412]); // "Precondition Failed"
console.log(statusCodeNames[413]); // "Payload Too Large"
console.log(statusCodeNames[414]); // "Uri Too Long"
console.log(statusCodeNames[415]); // "Unsupported Media Type"
console.log(statusCodeNames[416]); // "Range Not Satisfiable"
console.log(statusCodeNames[417]); // "Expectation Failed"
console.log(statusCodeNames[418]); // "Im A Teapot"
console.log(statusCodeNames[420]); // "Enhance Your Calm"
console.log(statusCodeNames[421]); // "Misdirected Request"
console.log(statusCodeNames[422]); // "Unprocessable Entity"
console.log(statusCodeNames[423]); // "Locked"
console.log(statusCodeNames[424]); // "Failed Dependency"
console.log(statusCodeNames[425]); // "Too Early"
console.log(statusCodeNames[426]); // "Upgrade Required"
console.log(statusCodeNames[428]); // "Precondition Required"
console.log(statusCodeNames[429]); // "Too Many Requests"
console.log(statusCodeNames[431]); // "Request Header Fields Too Large"
console.log(statusCodeNames[440]); // "Login Time Out"
console.log(statusCodeNames[444]); // "No Response"
console.log(statusCodeNames[449]); // "Retry With"
console.log(statusCodeNames[450]); // "Blocked By Windows Parental Controls"
console.log(statusCodeNames[451]); // "Unavailable For Legal Reasons"
console.log(statusCodeNames[499]); // "Client Closed Request"

// Server error responses (500-599)
console.log(statusCodeNames[500]); // "Internal Server Error"
console.log(statusCodeNames[501]); // "Not Implemented"
console.log(statusCodeNames[502]); // "Bad Gateway"
console.log(statusCodeNames[503]); // "Service Unavailable"
console.log(statusCodeNames[504]); // "Gateway Timeout"
console.log(statusCodeNames[505]); // "Http Version Not Supported"
console.log(statusCodeNames[506]); // "Variant Also Negotiates"
console.log(statusCodeNames[507]); // "Insufficient Storage"
console.log(statusCodeNames[508]); // "Loop Detected"
console.log(statusCodeNames[509]); // "Bandwidth Limit Exceeded"
console.log(statusCodeNames[510]); // "Not Extended"
console.log(statusCodeNames[511]); // "Network Authentication Required"
console.log(statusCodeNames[598]); // "Network Read Timeout"
console.log(statusCodeNames[599]); // "Network Connect Timeout"
```

&nbsp;

## License

[Back to top](#table-of-contents)

ISC

&nbsp;

## Changelog

[Back to top](#table-of-contents)

### 4.0.0 (2024-03-14)

**Breaking Changes**

- Renamed main enum from `EStatusCode` to `StatusCode` for better naming conventions
- Changed minimum supported TypeScript version to 4.7.0

**New Features**

- Added category checking functions:
  - `isInformational(code)` - Check if code is 100-199
  - `isSuccess(code)` - Check if code is 200-299
  - `isRedirect(code)` - Check if code is 300-399
  - `isClientError(code)` - Check if code is 400-499
  - `isServerError(code)` - Check if code is 500-599
- Added specific status helper functions:
  - `requiresAuthentication(code)` - Check if status code is 401
  - `isNotFound(code)` - Check if status code is 404
  - `isRateLimited(code)` - Check if status code is 429
- Added reverse lookup function:
  - `getStatusCodeByName(name)` - Get status code by its name

**Improvements**

- Improved TypeScript type safety
- Enhanced documentation with more examples
- Added complete status code name listing in README

&nbsp;

### 3.0.0 (2023-12-15)

**Breaking Changes**

- Made package compatible with both ESM and CommonJS projects
- Updated directory structure to support dual module format
- Changed build output to include separate ESM, CommonJS and types directories

**New Features**

- Added `isValidStatusCode()` function

&nbsp;

### 2.0.0 (2023-06-20)

**Breaking Changes**

- Complete rewrite in TypeScript
- Enhanced enum naming with category prefixes

**New Features**

- Added `statusCodeNames` object for name lookups

&nbsp;

### 1.0.0 (2023-01-10)

- Initial release with basic HTTP status code enum
