import Constants from "expo-constants";

import isString from "../string/isString";

export default function getHeaders(token) {
  return {
    // Accept: "application/json",
    // Accept: "*/*",
    "Content-Type": "application/json",
    // Connection: "keep-alive",
    // "Accept-Encoding": "gzip, deflate, br",
    // "Session-Id": `SID:${Constants.sessionId}`,
    // ...(isString(token) ? { Authorization: `Bearer ${token}` } : {}),
  };
}
