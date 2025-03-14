"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCodeByName = exports.isRateLimited = exports.isNotFound = exports.requiresAuthentication = exports.isServerError = exports.isClientError = exports.isRedirect = exports.isSuccess = exports.isInformational = exports.isValidStatusCode = exports.statusCodeNames = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    /* 1   ********* INFO *********/
    /* 100 */ StatusCode[StatusCode["INFO_CONTINUE"] = 100] = "INFO_CONTINUE";
    /* 101 */ StatusCode[StatusCode["INFO_SWITCHING_PROTOCOLS"] = 101] = "INFO_SWITCHING_PROTOCOLS";
    /* 102 */ StatusCode[StatusCode["INFO_PROCESSING"] = 102] = "INFO_PROCESSING";
    /* 103 */ StatusCode[StatusCode["INFO_EARLY_HINTS"] = 103] = "INFO_EARLY_HINTS";
    /* 2   ********* SUCCESS *********/
    /* 200 */ StatusCode[StatusCode["SUCCESS_OK"] = 200] = "SUCCESS_OK";
    /* 201 */ StatusCode[StatusCode["SUCCESS_CREATED"] = 201] = "SUCCESS_CREATED";
    /* 202 */ StatusCode[StatusCode["SUCCESS_ACCEPTED"] = 202] = "SUCCESS_ACCEPTED";
    /* 203 */ StatusCode[StatusCode["SUCCESS_NON_AUTHORITATIVE_INFORMATION"] = 203] = "SUCCESS_NON_AUTHORITATIVE_INFORMATION";
    /* 204 */ StatusCode[StatusCode["SUCCESS_NO_CONTENT"] = 204] = "SUCCESS_NO_CONTENT";
    /* 205 */ StatusCode[StatusCode["SUCCESS_RESET_CONTENT"] = 205] = "SUCCESS_RESET_CONTENT";
    /* 206 */ StatusCode[StatusCode["SUCCESS_PARTIAL_CONTENT"] = 206] = "SUCCESS_PARTIAL_CONTENT";
    /* 207 */ StatusCode[StatusCode["SUCCESS_MULTI_STATUS"] = 207] = "SUCCESS_MULTI_STATUS";
    /* 208 */ StatusCode[StatusCode["SUCCESS_ALREADY_REPORTED"] = 208] = "SUCCESS_ALREADY_REPORTED";
    /* 226 */ StatusCode[StatusCode["SUCCESS_IM_USED"] = 226] = "SUCCESS_IM_USED";
    /* 3   ********* REDIRECT *********/
    /* 300 */ StatusCode[StatusCode["REDIRECT_MULTIPLE_CHOICES"] = 300] = "REDIRECT_MULTIPLE_CHOICES";
    /* 301 */ StatusCode[StatusCode["REDIRECT_MOVED_PERMANENTLY"] = 301] = "REDIRECT_MOVED_PERMANENTLY";
    /* 302 */ StatusCode[StatusCode["REDIRECT_FOUND"] = 302] = "REDIRECT_FOUND";
    /* 303 */ StatusCode[StatusCode["REDIRECT_SEE_OTHER"] = 303] = "REDIRECT_SEE_OTHER";
    /* 304 */ StatusCode[StatusCode["REDIRECT_NOT_MODIFIED"] = 304] = "REDIRECT_NOT_MODIFIED";
    /* 305 */ StatusCode[StatusCode["REDIRECT_USE_PROXY"] = 305] = "REDIRECT_USE_PROXY";
    /* 306 */ StatusCode[StatusCode["REDIRECT_SWITCH_PROXY"] = 306] = "REDIRECT_SWITCH_PROXY";
    /* 307 */ StatusCode[StatusCode["REDIRECT_TEMPORARY_REDIRECT"] = 307] = "REDIRECT_TEMPORARY_REDIRECT";
    /* 308 */ StatusCode[StatusCode["REDIRECT_PERMANENT_REDIRECT"] = 308] = "REDIRECT_PERMANENT_REDIRECT";
    /* 4   ********* CLIENT_ERROR *********/
    /* 400 */ StatusCode[StatusCode["CLIENT_ERROR_BAD_REQUEST"] = 400] = "CLIENT_ERROR_BAD_REQUEST";
    /* 401 */ StatusCode[StatusCode["CLIENT_ERROR_UNAUTHORIZED"] = 401] = "CLIENT_ERROR_UNAUTHORIZED";
    /* 402 */ StatusCode[StatusCode["CLIENT_ERROR_PAYMENT_REQUIRED"] = 402] = "CLIENT_ERROR_PAYMENT_REQUIRED";
    /* 403 */ StatusCode[StatusCode["CLIENT_ERROR_FORBIDDEN"] = 403] = "CLIENT_ERROR_FORBIDDEN";
    /* 404 */ StatusCode[StatusCode["CLIENT_ERROR_NOT_FOUND"] = 404] = "CLIENT_ERROR_NOT_FOUND";
    /* 405 */ StatusCode[StatusCode["CLIENT_ERROR_METHOD_NOT_ALLOWED"] = 405] = "CLIENT_ERROR_METHOD_NOT_ALLOWED";
    /* 406 */ StatusCode[StatusCode["CLIENT_ERROR_NOT_ACCEPTABLE"] = 406] = "CLIENT_ERROR_NOT_ACCEPTABLE";
    /* 407 */ StatusCode[StatusCode["CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED"] = 407] = "CLIENT_ERROR_PROXY_AUTHENTICATION_REQUIRED";
    /* 408 */ StatusCode[StatusCode["CLIENT_ERROR_REQUEST_TIMEOUT"] = 408] = "CLIENT_ERROR_REQUEST_TIMEOUT";
    /* 409 */ StatusCode[StatusCode["CLIENT_ERROR_CONFLICT"] = 409] = "CLIENT_ERROR_CONFLICT";
    /* 410 */ StatusCode[StatusCode["CLIENT_ERROR_GONE"] = 410] = "CLIENT_ERROR_GONE";
    /* 411 */ StatusCode[StatusCode["CLIENT_ERROR_LENGTH_REQUIRED"] = 411] = "CLIENT_ERROR_LENGTH_REQUIRED";
    /* 412 */ StatusCode[StatusCode["CLIENT_ERROR_PRECONDITION_FAILED"] = 412] = "CLIENT_ERROR_PRECONDITION_FAILED";
    /* 413 */ StatusCode[StatusCode["CLIENT_ERROR_PAYLOAD_TOO_LARGE"] = 413] = "CLIENT_ERROR_PAYLOAD_TOO_LARGE";
    /* 414 */ StatusCode[StatusCode["CLIENT_ERROR_URI_TOO_LONG"] = 414] = "CLIENT_ERROR_URI_TOO_LONG";
    /* 415 */ StatusCode[StatusCode["CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE"] = 415] = "CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE";
    /* 416 */ StatusCode[StatusCode["CLIENT_ERROR_RANGE_NOT_SATISFIABLE"] = 416] = "CLIENT_ERROR_RANGE_NOT_SATISFIABLE";
    /* 417 */ StatusCode[StatusCode["CLIENT_ERROR_EXPECTATION_FAILED"] = 417] = "CLIENT_ERROR_EXPECTATION_FAILED";
    /* 418 */ StatusCode[StatusCode["CLIENT_ERROR_IM_A_TEAPOT"] = 418] = "CLIENT_ERROR_IM_A_TEAPOT";
    /* 420 */ StatusCode[StatusCode["CLIENT_ERROR_ENHANCE_YOUR_CALM"] = 420] = "CLIENT_ERROR_ENHANCE_YOUR_CALM";
    /* 421 */ StatusCode[StatusCode["CLIENT_ERROR_MISDIRECTED_REQUEST"] = 421] = "CLIENT_ERROR_MISDIRECTED_REQUEST";
    /* 422 */ StatusCode[StatusCode["CLIENT_ERROR_UNPROCESSABLE_ENTITY"] = 422] = "CLIENT_ERROR_UNPROCESSABLE_ENTITY";
    /* 423 */ StatusCode[StatusCode["CLIENT_ERROR_LOCKED"] = 423] = "CLIENT_ERROR_LOCKED";
    /* 424 */ StatusCode[StatusCode["CLIENT_ERROR_FAILED_DEPENDENCY"] = 424] = "CLIENT_ERROR_FAILED_DEPENDENCY";
    /* 425 */ StatusCode[StatusCode["CLIENT_ERROR_TOO_EARLY"] = 425] = "CLIENT_ERROR_TOO_EARLY";
    /* 426 */ StatusCode[StatusCode["CLIENT_ERROR_UPGRADE_REQUIRED"] = 426] = "CLIENT_ERROR_UPGRADE_REQUIRED";
    /* 428 */ StatusCode[StatusCode["CLIENT_ERROR_PRECONDITION_REQUIRED"] = 428] = "CLIENT_ERROR_PRECONDITION_REQUIRED";
    /* 429 */ StatusCode[StatusCode["CLIENT_ERROR_TOO_MANY_REQUESTS"] = 429] = "CLIENT_ERROR_TOO_MANY_REQUESTS";
    /* 431 */ StatusCode[StatusCode["CLIENT_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "CLIENT_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE";
    /* 440 */ StatusCode[StatusCode["CLIENT_ERROR_LOGIN_TIME_OUT"] = 440] = "CLIENT_ERROR_LOGIN_TIME_OUT";
    /* 444 */ StatusCode[StatusCode["CLIENT_ERROR_NO_RESPONSE"] = 444] = "CLIENT_ERROR_NO_RESPONSE";
    /* 449 */ StatusCode[StatusCode["CLIENT_ERROR_RETRY_WITH"] = 449] = "CLIENT_ERROR_RETRY_WITH";
    /* 450 */ StatusCode[StatusCode["CLIENT_ERROR_BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS"] = 450] = "CLIENT_ERROR_BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS";
    /* 451 */ StatusCode[StatusCode["CLIENT_ERROR_UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "CLIENT_ERROR_UNAVAILABLE_FOR_LEGAL_REASONS";
    /* 499 */ StatusCode[StatusCode["CLIENT_ERROR_CLIENT_CLOSED_REQUEST"] = 499] = "CLIENT_ERROR_CLIENT_CLOSED_REQUEST";
    /* 5   ********* SERVER_ERROR *********/
    /* 500 */ StatusCode[StatusCode["SERVER_ERROR_INTERNAL_SERVER_ERROR"] = 500] = "SERVER_ERROR_INTERNAL_SERVER_ERROR";
    /* 501 */ StatusCode[StatusCode["SERVER_ERROR_NOT_IMPLEMENTED"] = 501] = "SERVER_ERROR_NOT_IMPLEMENTED";
    /* 502 */ StatusCode[StatusCode["SERVER_ERROR_BAD_GATEWAY"] = 502] = "SERVER_ERROR_BAD_GATEWAY";
    /* 503 */ StatusCode[StatusCode["SERVER_ERROR_SERVICE_UNAVAILABLE"] = 503] = "SERVER_ERROR_SERVICE_UNAVAILABLE";
    /* 504 */ StatusCode[StatusCode["SERVER_ERROR_GATEWAY_TIMEOUT"] = 504] = "SERVER_ERROR_GATEWAY_TIMEOUT";
    /* 505 */ StatusCode[StatusCode["SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED"] = 505] = "SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED";
    /* 506 */ StatusCode[StatusCode["SERVER_ERROR_VARIANT_ALSO_NEGOTIATES"] = 506] = "SERVER_ERROR_VARIANT_ALSO_NEGOTIATES";
    /* 507 */ StatusCode[StatusCode["SERVER_ERROR_INSUFFICIENT_STORAGE"] = 507] = "SERVER_ERROR_INSUFFICIENT_STORAGE";
    /* 508 */ StatusCode[StatusCode["SERVER_ERROR_LOOP_DETECTED"] = 508] = "SERVER_ERROR_LOOP_DETECTED";
    /* 509 */ StatusCode[StatusCode["SERVER_ERROR_BANDWIDTH_LIMIT_EXCEEDED"] = 509] = "SERVER_ERROR_BANDWIDTH_LIMIT_EXCEEDED";
    /* 510 */ StatusCode[StatusCode["SERVER_ERROR_NOT_EXTENDED"] = 510] = "SERVER_ERROR_NOT_EXTENDED";
    /* 511 */ StatusCode[StatusCode["SERVER_ERROR_NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "SERVER_ERROR_NETWORK_AUTHENTICATION_REQUIRED";
    /* 598 */ StatusCode[StatusCode["SERVER_ERROR_NETWORK_READ_TIMEOUT"] = 598] = "SERVER_ERROR_NETWORK_READ_TIMEOUT";
    /* 599 */ StatusCode[StatusCode["SERVER_ERROR_NETWORK_CONNECT_TIMEOUT"] = 599] = "SERVER_ERROR_NETWORK_CONNECT_TIMEOUT";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
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
exports.statusCodeNames = Object.fromEntries(Object.entries(StatusCode).map(([key, value]) => [
    value,
    key
        .replace(/^(INFO_|SUCCESS_|REDIRECT_|CLIENT_ERROR_|SERVER_ERROR_)/, '') // Remove category prefixes
        .replace(/_/g, ' ') // Replace underscores with spaces
        .toLowerCase() // Convert to lowercase
        .replace(/\b\w/g, char => char.toUpperCase()), // Capitalize each word
]));
const isValidStatusCode = (code) => Object.values(StatusCode).includes(Number(code)) || Object.values(exports.statusCodeNames).includes(String(code));
exports.isValidStatusCode = isValidStatusCode;
/// Category Checking Functions
/**
 * Checks if status code is informational (100-199)
 */
const isInformational = (code) => code >= 100 && code < 200;
exports.isInformational = isInformational;
/**
 * Checks if status code indicates success (200-299)
 */
const isSuccess = (code) => code >= 200 && code < 300;
exports.isSuccess = isSuccess;
/**
 * Checks if status code indicates redirection (300-399)
 */
const isRedirect = (code) => code >= 300 && code < 400;
exports.isRedirect = isRedirect;
/**
 * Checks if status code indicates client error (400-499)
 */
const isClientError = (code) => code >= 400 && code < 500;
exports.isClientError = isClientError;
/**
 * Checks if status code indicates server error (500-599)
 */
const isServerError = (code) => code >= 500 && code < 600;
exports.isServerError = isServerError;
/// Specific Status Helpers
/**
 * Checks if status code requires authentication
 */
const requiresAuthentication = (code) => code === StatusCode.CLIENT_ERROR_UNAUTHORIZED;
exports.requiresAuthentication = requiresAuthentication;
/**
 * Checks if status code indicates resource not found
 */
const isNotFound = (code) => code === StatusCode.CLIENT_ERROR_NOT_FOUND;
exports.isNotFound = isNotFound;
/**
 * Checks if status code indicates rate limiting
 */
const isRateLimited = (code) => code === StatusCode.CLIENT_ERROR_TOO_MANY_REQUESTS;
exports.isRateLimited = isRateLimited;
/// Reverse Lookup
/**
 * Get status code by name (case insensitive)
 * @example
 * getStatusCodeByName('not found'); // Returns 404
 * getStatusCodeByName('Not Found'); // Returns 404
 */
const getStatusCodeByName = (name) => {
    const normalizedName = name.toLowerCase();
    const entry = Object.entries(exports.statusCodeNames).find(([_, statusName]) => statusName.toLowerCase() === normalizedName);
    return entry ? Number(entry[0]) : undefined;
};
exports.getStatusCodeByName = getStatusCodeByName;
