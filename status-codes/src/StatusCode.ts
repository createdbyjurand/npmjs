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
      .replace(/^(INFO_|SUCCESS_|REDIRECT_|CLIENT_ERROR_|SERVER_ERROR_)/, '') // Remove category prefixes
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
export const requiresAuthentication = (code: number): boolean => code === StatusCode.CLIENT_ERROR_UNAUTHORIZED;

/**
 * Checks if status code indicates resource not found
 */
export const isNotFound = (code: number): boolean => code === StatusCode.CLIENT_ERROR_NOT_FOUND;

/**
 * Checks if status code indicates rate limiting
 */
export const isRateLimited = (code: number): boolean => code === StatusCode.CLIENT_ERROR_TOO_MANY_REQUESTS;

/// Reverse Lookup

/**
 * Get status code by name (case insensitive)
 * @example
 * getStatusCodeByName('not found'); // Returns 404
 * getStatusCodeByName('Not Found'); // Returns 404
 */
export const getStatusCodeByName = (name: string): number | undefined => {
  const normalizedName = name.toLowerCase();
  const entry = Object.entries(statusCodeNames).find(([_, statusName]) => statusName.toLowerCase() === normalizedName);
  return entry ? Number(entry[0]) : undefined;
};
