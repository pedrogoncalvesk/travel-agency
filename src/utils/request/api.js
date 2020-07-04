/*
 * General api to access data
 */

import constants from "../../config/constants";
import isNumber from "../number/isNumber";
import isObject from "../object/isObject";
import getHeaders from "./getHeaders";
import getBody from "./getBody";
import raceTimeout from "./raceTimeout";
import fetchProgress from "./fetchProgress";
// import { getToken } from "../token";

const __makeRequest = (url, options, timeout, onProgress) => {
  if (isNumber(timeout)) {
    return raceTimeout(
      { 1: url, 2: options, 3: onProgress },
      timeout,
      // eslint-disable-next-line no-undef
      typeof onProgress === "function" ? fetchProgress : fetch,
    );
  }
  if (typeof onProgress === "function") {
    return fetchProgress(url, options, onProgress);
  }
  console.log("here", url, options);
  // eslint-disable-next-line no-undef
  return fetch(url, options);
};

const __tryGetJSON = res =>
  new Promise(resolve => {
    if (res && typeof res.json === "function") {
      res
        .json()
        .then(json => resolve(json))
        .catch(() => resolve(res));
    } else {
      resolve(res);
    }
  });

const __reject = err => {
  const { message } = err;
  if (message === constants.TIMEOUT) return { status: "timeout", message };
  throw err;
};

async function _get(
  url,
  path,
  params,
  headers = {},
  timeout = false,
  onProgress,
) {
  // const token = await getToken();
  // headers = { ...getHeaders(token), ...headers };
  const hds = { ...getHeaders(), ...headers };

  let query = "";
  if (isObject(params) && Object.keys(params).length) {
    query = `?${new URLSearchParams(params).toString()}`;
  }
  return __makeRequest(
    `${url}${path}${query}`,
    {
      method: "GET",
      headers: hds,
      params: getBody(params, hds),
    },
    timeout,
    onProgress,
  )
    .then(__tryGetJSON)
    .catch(__reject);
}

async function _post(
  url,
  path,
  data,
  headers = {},
  timeout = false,
  onProgress,
) {
  // const token = await getToken();
  // headers = { ...getHeaders(token), ...headers };
  const hds = { ...getHeaders(), ...headers };

  return fetch(`${url}${path}`, {
    method: "POST",
    headers: hds,
    keepAlive: true,
    body: getBody(data, hds),
    // body: null,
  })
    .then(__tryGetJSON)
    .catch(__reject);
  // return __makeRequest(
  //   `${url}${path}`,
  //   {
  //     method: "POST",
  //     headers: hds,
  //     keepAlive: true,
  //     body: getBody(data, hds),
  //     bodyUsed: true,
  //     // body: null,
  //   },
  //   timeout,
  //   onProgress,
  // )
  //   .then(__tryGetJSON)
  //   .catch(__reject);
}

async function _put(
  url,
  path,
  data,
  headers = {},
  timeout = false,
  onProgress,
) {
  // const token = await getToken();
  // headers = { ...getHeaders(token), ...headers };
  const hds = { ...getHeaders(), ...headers };

  return __makeRequest(
    `${url}${path}`,
    {
      method: "PUT",
      headers: hds,
      body: getBody(data, hds),
    },
    timeout,
    onProgress,
  )
    .then(__tryGetJSON)
    .catch(__reject);
}

async function _remove(
  url,
  path,
  params,
  headers = {},
  timeout = false,
  onProgress,
) {
  // const token = await getToken();
  // headers = { ...getHeaders(token), ...headers };
  const hds = { ...getHeaders(), ...headers };

  let query = "";
  if (isObject(params) && Object.keys(params).length) {
    query = `?${new URLSearchParams(params).toString()}`;
  }
  return __makeRequest(
    `${url}${path}${query}`,
    {
      method: "DELETE",
      headers: hds,
      params: getBody(params, hds),
    },
    timeout,
    onProgress,
  )
    .then(__tryGetJSON)
    .catch(__reject);
}

async function _patch(
  url,
  path,
  data,
  headers = {},
  timeout = false,
  onProgress,
) {
  // const token = await getToken();
  // headers = { ...getHeaders(token), ...headers };
  const hds = { ...getHeaders(), ...headers };

  return __makeRequest(
    `${url}${path}`,
    {
      method: "PATCH",
      headers: hds,
      body: getBody(data, hds),
    },
    timeout,
    onProgress,
  )
    .then(__tryGetJSON)
    .catch(__reject);
}

export default {
  get: (path, data, headers = {}, timeout = false, callbackProgress) =>
    _get(constants.BASE_URL, path, data, headers, timeout, callbackProgress),
  post: (path, data, headers = {}, timeout = false, callbackProgress) =>
    _post(constants.BASE_URL, path, data, headers, timeout, callbackProgress),
  put: (path, data, headers = {}, timeout = false, callbackProgress) =>
    _put(constants.BASE_URL, path, data, headers, timeout, callbackProgress),
  remove: (path, data, headers = {}, timeout = false, callbackProgress) =>
    _remove(constants.BASE_URL, path, data, headers, timeout, callbackProgress),
  patch: (path, data, headers = {}, timeout = false, callbackProgress) =>
    _patch(constants.BASE_URL, path, data, headers, timeout, callbackProgress),
};
