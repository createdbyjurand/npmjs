export declare enum StatusCode {
    INFO_CONTINUE = 100,
    INFO_SWITCHING_PROTOCOLS = 101,
    INFO_PROCESSING = 102,
    INFO_EARLY_HINTS = 103,// Experimental
    SUCCESS_OK = 200,
    SUCCESS_CREATED = 201,
    SUCCESS_ACCEPTED = 202,
    SUCCESS_NON_AUTHORITATIVE_INFORMATION = 203,
    SUCCESS_NO_CONTENT = 204,
    SUCCESS_RESET_CONTENT = 205,
    SUCCESS_PARTIAL_CONTENT = 206,
    SUCCESS_MULTI_STATUS = 207,
    SUCCESS_ALREADY_REPORTED = 208,
    SUCCESS_IM_USED = 226,
    REDIRECT_MULTIPLE_CHOICES = 300,
    REDIRECT_MOVED_PERMANENTLY = 301,
    REDIRECT_FOUND = 302,// Previously "MOVED_TEMPORARILY"
    REDIRECT_SEE_OTHER = 303,
    REDIRECT_NOT_MODIFIED = 304,
    REDIRECT_USE_PROXY = 305,
    REDIRECT_SWITCH_PROXY = 306,
    REDIRECT_TEMPORARY_REDIRECT = 307,
    REDIRECT_PERMANENT_REDIRECT = 308,
    CLIENT_ERROR_BAD_REQUEST = 400,
    CLIENT_ERROR_UNAUTHORIZED = 401,
    CLIENT_ERROR_PAYMENT_REQUIRED = 402,
    CLIENT_ERROR_FORBIDDEN = 403,
    CLIENT_ERROR_NOT_FOUND = 404,
    CLIENT_ERROR_METHOD_NOT_ALLOWED = 405,
    CLIENT_ERROR_NOT_ACCEPTABLE = 406,
    CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED = 407,
    CLIENT_ERROR_REQUEST_TIMEOUT = 408,
    CLIENT_ERROR_CONFLICT = 409,
    CLIENT_ERROR_GONE = 410,
    CLIENT_ERROR_LENGTH_REQUIRED = 411,
    CLIENT_ERROR_PRECONDITION_FAILED = 412,
    CLIENT_ERROR_PAYLOAD_TOO_LARGE = 413,
    CLIENT_ERROR_URI_TOO_LONG = 414,
    CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE = 415,
    CLIENT_ERROR_RANGE_NOT_SATISFIABLE = 416,
    CLIENT_ERROR_EXPECTATION_FAILED = 417,
    CLIENT_ERROR_IM_A_TEAPOT = 418,
    CLIENT_ERROR_ENHANCE_YOUR_CALM = 420,// Non-standard, specific to Twitter
    CLIENT_ERROR_MISDIRECTED_REQUEST = 421,
    CLIENT_ERROR_UNPROCESSABLE_ENTITY = 422,
    CLIENT_ERROR_LOCKED = 423,
    CLIENT_ERROR_FAILED_DEPENDENCY = 424,
    CLIENT_ERROR_TOO_EARLY = 425,
    CLIENT_ERROR_UPGRADE_REQUIRED = 426,
    CLIENT_ERROR_PRECONDITION_REQUIRED = 428,
    CLIENT_ERROR_TOO_MANY_REQUESTS = 429,
    CLIENT_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    CLIENT_ERROR_LOGIN_TIME_OUT = 440,// Non-standard, specific to Microsoft IIS
    CLIENT_ERROR_NO_RESPONSE = 444,// Non-standard, specific to Nginx
    CLIENT_ERROR_RETRY_WITH = 449,// Non-standard, specific to Microsoft IIS
    CLIENT_ERROR_BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS = 450,// Non-standard, specific to Microsoft IIS
    CLIENT_ERROR_UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    CLIENT_ERROR_CLIENT_CLOSED_REQUEST = 499,
    SERVER_ERROR_INTERNAL_SERVER_ERROR = 500,
    SERVER_ERROR_NOT_IMPLEMENTED = 501,
    SERVER_ERROR_BAD_GATEWAY = 502,
    SERVER_ERROR_SERVICE_UNAVAILABLE = 503,
    SERVER_ERROR_GATEWAY_TIMEOUT = 504,
    SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED = 505,
    SERVER_ERROR_VARIANT_ALSO_NEGOTIATES = 506,
    SERVER_ERROR_INSUFFICIENT_STORAGE = 507,
    SERVER_ERROR_LOOP_DETECTED = 508,
    SERVER_ERROR_BANDWIDTH_LIMIT_EXCEEDED = 509,// Non-standard, hosting-specific
    SERVER_ERROR_NOT_EXTENDED = 510,
    SERVER_ERROR_NETWORK_AUTHENTICATION_REQUIRED = 511,
    SERVER_ERROR_NETWORK_READ_TIMEOUT = 598,// Non-standard, proxy-specific
    SERVER_ERROR_NETWORK_CONNECT_TIMEOUT = 599
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
export declare const statusCodeNames: Record<number, string>;
export declare const isValidStatusCode: (code: string | number) => boolean;
/**
 * Checks if status code is informational (100-199)
 */
export declare const isInformational: (code: number) => boolean;
/**
 * Checks if status code indicates success (200-299)
 */
export declare const isSuccess: (code: number) => boolean;
/**
 * Checks if status code indicates redirection (300-399)
 */
export declare const isRedirect: (code: number) => boolean;
/**
 * Checks if status code indicates client error (400-499)
 */
export declare const isClientError: (code: number) => boolean;
/**
 * Checks if status code indicates server error (500-599)
 */
export declare const isServerError: (code: number) => boolean;
/**
 * Checks if status code requires authentication
 */
export declare const requiresAuthentication: (code: number) => boolean;
/**
 * Checks if status code indicates resource not found
 */
export declare const isNotFound: (code: number) => boolean;
/**
 * Checks if status code indicates rate limiting
 */
export declare const isRateLimited: (code: number) => boolean;
/**
 * Get status code by name (case insensitive)
 * @example
 * getStatusCodeByName('not found'); // Returns 404
 * getStatusCodeByName('Not Found'); // Returns 404
 */
export declare const getStatusCodeByName: (name: string) => number | undefined;
//# sourceMappingURL=StatusCode.d.ts.map