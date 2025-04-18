"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCodeByName = exports.isRateLimited = exports.isNotFound = exports.requiresAuthentication = exports.isServerError = exports.isClientError = exports.isRedirect = exports.isSuccess = exports.isInformational = exports.isValidStatusCode = exports.statusCodeNames = exports.StatusCodes = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["CONTINUE"] = 100] = "CONTINUE";
    StatusCode[StatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    StatusCode[StatusCode["PROCESSING"] = 102] = "PROCESSING";
    StatusCode[StatusCode["EARLY_HINTS"] = 103] = "EARLY_HINTS";
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCode[StatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCode[StatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    StatusCode[StatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    StatusCode[StatusCode["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    StatusCode[StatusCode["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    StatusCode[StatusCode["IM_USED"] = 226] = "IM_USED";
    StatusCode[StatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    StatusCode[StatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    StatusCode[StatusCode["FOUND"] = 302] = "FOUND";
    StatusCode[StatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    StatusCode[StatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    StatusCode[StatusCode["USE_PROXY"] = 305] = "USE_PROXY";
    StatusCode[StatusCode["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    StatusCode[StatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    StatusCode[StatusCode["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    StatusCode[StatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    StatusCode[StatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    StatusCode[StatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["GONE"] = 410] = "GONE";
    StatusCode[StatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    StatusCode[StatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    StatusCode[StatusCode["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    StatusCode[StatusCode["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    StatusCode[StatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    StatusCode[StatusCode["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    StatusCode[StatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    StatusCode[StatusCode["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
    StatusCode[StatusCode["ENHANCE_YOUR_CALM"] = 420] = "ENHANCE_YOUR_CALM";
    StatusCode[StatusCode["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    StatusCode[StatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    StatusCode[StatusCode["LOCKED"] = 423] = "LOCKED";
    StatusCode[StatusCode["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    StatusCode[StatusCode["TOO_EARLY"] = 425] = "TOO_EARLY";
    StatusCode[StatusCode["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    StatusCode[StatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    StatusCode[StatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    StatusCode[StatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    StatusCode[StatusCode["LOGIN_TIME_OUT"] = 440] = "LOGIN_TIME_OUT";
    StatusCode[StatusCode["NO_RESPONSE"] = 444] = "NO_RESPONSE";
    StatusCode[StatusCode["RETRY_WITH"] = 449] = "RETRY_WITH";
    StatusCode[StatusCode["BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS"] = 450] = "BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS";
    StatusCode[StatusCode["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    StatusCode[StatusCode["CLIENT_CLOSED_REQUEST"] = 499] = "CLIENT_CLOSED_REQUEST";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCode[StatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    StatusCode[StatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    StatusCode[StatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    StatusCode[StatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    StatusCode[StatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    StatusCode[StatusCode["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    StatusCode[StatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    StatusCode[StatusCode["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    StatusCode[StatusCode["BANDWIDTH_LIMIT_EXCEEDED"] = 509] = "BANDWIDTH_LIMIT_EXCEEDED";
    StatusCode[StatusCode["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    StatusCode[StatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
    StatusCode[StatusCode["NETWORK_READ_TIMEOUT"] = 598] = "NETWORK_READ_TIMEOUT";
    StatusCode[StatusCode["NETWORK_CONNECT_TIMEOUT"] = 599] = "NETWORK_CONNECT_TIMEOUT";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
exports.StatusCodes = Object.entries(StatusCode)
    .filter(([key, value]) => typeof value === 'number')
    .reduce((acc, [key, value]) => {
    const code = value;
    if (code >= 100 && code <= 199) {
        (acc.INFO ??= {})[key] = code;
    }
    else if (code >= 200 && code <= 299) {
        (acc.SUCCESS ??= {})[key] = code;
    }
    else if (code >= 300 && code <= 399) {
        (acc.REDIRECT ??= {})[key] = code;
    }
    else if (code >= 400 && code <= 499) {
        (acc.CLIENT_ERROR ??= {})[key] = code;
    }
    else if (code >= 500 && code <= 599) {
        (acc.SERVER_ERROR ??= {})[key] = code;
    }
    return acc;
}, {});
exports.statusCodeNames = Object.fromEntries(Object.entries(StatusCode).map(([key, value]) => [
    value,
    key
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase()),
]));
const isValidStatusCode = (code) => Object.values(StatusCode).includes(Number(code)) || Object.values(exports.statusCodeNames).includes(String(code));
exports.isValidStatusCode = isValidStatusCode;
const isInformational = (code) => code >= 100 && code < 200;
exports.isInformational = isInformational;
const isSuccess = (code) => code >= 200 && code < 300;
exports.isSuccess = isSuccess;
const isRedirect = (code) => code >= 300 && code < 400;
exports.isRedirect = isRedirect;
const isClientError = (code) => code >= 400 && code < 500;
exports.isClientError = isClientError;
const isServerError = (code) => code >= 500 && code < 600;
exports.isServerError = isServerError;
const requiresAuthentication = (code) => code === StatusCode.UNAUTHORIZED;
exports.requiresAuthentication = requiresAuthentication;
const isNotFound = (code) => code === StatusCode.NOT_FOUND;
exports.isNotFound = isNotFound;
const isRateLimited = (code) => code === StatusCode.TOO_MANY_REQUESTS;
exports.isRateLimited = isRateLimited;
const getStatusCodeByName = (name) => {
    const normalizedName = name.toLowerCase().replace(/_/g, ' ');
    const entry = Object.entries(exports.statusCodeNames).find(([_, statusName]) => statusName.toLowerCase() === normalizedName);
    return entry ? Number(entry[0]) : undefined;
};
exports.getStatusCodeByName = getStatusCodeByName;
