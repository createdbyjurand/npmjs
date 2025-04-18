export enum StatusCode {
  /* 1   ********* INFO *********/
  /* 100 */ CONTINUE = 100,
  /* 101 */ SWITCHING_PROTOCOLS = 101,
  /* 102 */ PROCESSING = 102,
  /* 103 */ EARLY_HINTS = 103, // Experimental
  /* 2   ********* SUCCESS *********/
  /* 200 */ OK = 200,
  /* 201 */ CREATED = 201,
  /* 202 */ ACCEPTED = 202,
  /* 203 */ NON_AUTHORITATIVE_INFORMATION = 203,
  /* 204 */ NO_CONTENT = 204,
  /* 205 */ RESET_CONTENT = 205,
  /* 206 */ PARTIAL_CONTENT = 206,
  /* 207 */ MULTI_STATUS = 207,
  /* 208 */ ALREADY_REPORTED = 208,
  /* 226 */ IM_USED = 226,
  /* 3   ********* REDIRECT *********/
  /* 300 */ MULTIPLE_CHOICES = 300,
  /* 301 */ MOVED_PERMANENTLY = 301,
  /* 302 */ FOUND = 302, // Previously "MOVED_TEMPORARILY"
  /* 303 */ SEE_OTHER = 303,
  /* 304 */ NOT_MODIFIED = 304,
  /* 305 */ USE_PROXY = 305,
  /* 306 */ SWITCH_PROXY = 306,
  /* 307 */ TEMPORARY_REDIRECT = 307,
  /* 308 */ PERMANENT_REDIRECT = 308,
  /* 4   ********* CLIENT_ERROR *********/
  /* 400 */ BAD_REQUEST = 400,
  /* 401 */ UNAUTHORIZED = 401,
  /* 402 */ PAYMENT_REQUIRED = 402,
  /* 403 */ FORBIDDEN = 403,
  /* 404 */ NOT_FOUND = 404,
  /* 405 */ METHOD_NOT_ALLOWED = 405,
  /* 406 */ NOT_ACCEPTABLE = 406,
  /* 407 */ PROXY_AUTHENTICATION_REQUIRED = 407,
  /* 408 */ REQUEST_TIMEOUT = 408,
  /* 409 */ CONFLICT = 409,
  /* 410 */ GONE = 410,
  /* 411 */ LENGTH_REQUIRED = 411,
  /* 412 */ PRECONDITION_FAILED = 412,
  /* 413 */ PAYLOAD_TOO_LARGE = 413,
  /* 414 */ URI_TOO_LONG = 414,
  /* 415 */ UNSUPPORTED_MEDIA_TYPE = 415,
  /* 416 */ RANGE_NOT_SATISFIABLE = 416,
  /* 417 */ EXPECTATION_FAILED = 417,
  /* 418 */ IM_A_TEAPOT = 418,
  /* 420 */ ENHANCE_YOUR_CALM = 420, // Non-standard, specific to Twitter
  /* 421 */ MISDIRECTED_REQUEST = 421,
  /* 422 */ UNPROCESSABLE_ENTITY = 422,
  /* 423 */ LOCKED = 423,
  /* 424 */ FAILED_DEPENDENCY = 424,
  /* 425 */ TOO_EARLY = 425,
  /* 426 */ UPGRADE_REQUIRED = 426,
  /* 428 */ PRECONDITION_REQUIRED = 428,
  /* 429 */ TOO_MANY_REQUESTS = 429,
  /* 431 */ REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  /* 440 */ LOGIN_TIME_OUT = 440, // Non-standard, specific to Microsoft IIS
  /* 444 */ NO_RESPONSE = 444, // Non-standard, specific to Nginx
  /* 449 */ RETRY_WITH = 449, // Non-standard, specific to Microsoft IIS
  /* 450 */ BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS = 450, // Non-standard, specific to Microsoft IIS
  /* 451 */ UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  /* 499 */ CLIENT_CLOSED_REQUEST = 499,
  /* 5   ********* SERVER_ERROR *********/
  /* 500 */ INTERNAL_SERVER_ERROR = 500,
  /* 501 */ NOT_IMPLEMENTED = 501,
  /* 502 */ BAD_GATEWAY = 502,
  /* 503 */ SERVICE_UNAVAILABLE = 503,
  /* 504 */ GATEWAY_TIMEOUT = 504,
  /* 505 */ HTTP_VERSION_NOT_SUPPORTED = 505,
  /* 506 */ VARIANT_ALSO_NEGOTIATES = 506,
  /* 507 */ INSUFFICIENT_STORAGE = 507,
  /* 508 */ LOOP_DETECTED = 508,
  /* 509 */ BANDWIDTH_LIMIT_EXCEEDED = 509, // Non-standard, hosting-specific
  /* 510 */ NOT_EXTENDED = 510,
  /* 511 */ NETWORK_AUTHENTICATION_REQUIRED = 511,
  /* 598 */ NETWORK_READ_TIMEOUT = 598, // Non-standard, proxy-specific
  /* 599 */ NETWORK_CONNECT_TIMEOUT = 599, // Non-standard, proxy-specific
}

export type StatusCodeCategories = {
  INFO: Record<string, number>;
  SUCCESS: Record<string, number>;
  REDIRECT: Record<string, number>;
  CLIENT_ERROR: Record<string, number>;
  SERVER_ERROR: Record<string, number>;
};

export const StatusCodes = Object.entries(StatusCode)
  .filter(([key, value]) => typeof value === 'number')
  .reduce((acc, [key, value]) => {
    const code = value as number;

    if (code >= 100 && code <= 199) {
      (acc.INFO ??= {})[key] = code;
    } else if (code >= 200 && code <= 299) {
      (acc.SUCCESS ??= {})[key] = code;
    } else if (code >= 300 && code <= 399) {
      (acc.REDIRECT ??= {})[key] = code;
    } else if (code >= 400 && code <= 499) {
      (acc.CLIENT_ERROR ??= {})[key] = code;
    } else if (code >= 500 && code <= 599) {
      (acc.SERVER_ERROR ??= {})[key] = code;
    }

    return acc;
  }, {} as StatusCodeCategories);

/**
 * @example
 * // Get the name of a specific status code
 * console.log(statusCodeNames[400]); // "Bad Request"
 * console.log(statusCodeNames[404]); // "Not Found"
 * console.log(statusCodeNames[500]); // "Internal Server Error"
 *
 * @example
 * // Use with response objects
 * if (response.status === 200) {
 *   console.log(`Success: ${statusCodeNames[response.status]}`);
 * }
 *
 * @example
 * // Iterate through all status code names
 * Object.entries(statusCodeNames).forEach(([code, name]) => {
 *   console.log(`${code}: ${name}`);
 * });
 */
export const statusCodeNames: Record<number, string> = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [
    value,
    key
      // .replace(/^(INFO_|SUCCESS_|REDIRECT_|CLIENT_ERROR_|SERVER_ERROR_)/, '') // Remove category prefixes
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase() // Convert to lowercase
      .replace(/\b\w/g, char => char.toUpperCase()), // Capitalize each word
  ]),
);

export const isValidStatusCode = (code: string | number): boolean =>
  Object.values(StatusCode).includes(Number(code)) || Object.values(statusCodeNames).includes(String(code));

/// Category Checking Functions

/**
 * Checks if status code is informational (100-199)
 */
export const isInformational = (code: number): boolean => code >= 100 && code < 200;

/**
 * Checks if status code indicates success (200-299)
 */
export const isSuccess = (code: number): boolean => code >= 200 && code < 300;

/**
 * Checks if status code indicates redirection (300-399)
 */
export const isRedirect = (code: number): boolean => code >= 300 && code < 400;

/**
 * Checks if status code indicates client error (400-499)
 */
export const isClientError = (code: number): boolean => code >= 400 && code < 500;

/**
 * Checks if status code indicates server error (500-599)
 */
export const isServerError = (code: number): boolean => code >= 500 && code < 600;

/// Specific Status Helpers

/**
 * Checks if status code requires authentication
 */
export const requiresAuthentication = (code: number): boolean => code === StatusCode.UNAUTHORIZED;

/**
 * Checks if status code indicates resource not found
 */
export const isNotFound = (code: number): boolean => code === StatusCode.NOT_FOUND;

/**
 * Checks if status code indicates rate limiting
 */
export const isRateLimited = (code: number): boolean => code === StatusCode.TOO_MANY_REQUESTS;

/// Reverse Lookup

/**
 * Get status code by name (case insensitive)
 * @example
 * getStatusCodeByName('not found'); // Returns 404
 * getStatusCodeByName('Not Found'); // Returns 404
 */
export const getStatusCodeByName = (name: string): number | undefined => {
  const normalizedName = name.toLowerCase().replace(/_/g, ' ');
  const entry = Object.entries(statusCodeNames).find(([_, statusName]) => statusName.toLowerCase() === normalizedName);
  return entry ? Number(entry[0]) : undefined;
};
