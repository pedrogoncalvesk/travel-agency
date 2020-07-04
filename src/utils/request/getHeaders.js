import Constants from "expo-constants";

import isString from "../string/isString";

export default function getHeaders(token) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Session-Id": `SID:${Constants.sessionId}`,
    ...(isString(token) ? { Authorization: `Bearer ${token}` } : {}),
  };
}
