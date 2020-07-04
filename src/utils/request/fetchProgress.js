import * as _ from "lodash";

import isObject from "../object/isObject";

const missingParamsMessage = "Missing params to make request:";

export default async function fetchProgress(url, options, onProgress) {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (typeof url !== "string") {
      return reject(new Error(`${missingParamsMessage} url`));
    }
    if (!isObject(options)) {
      return reject(new Error(`${missingParamsMessage} options object`));
    }
    if (typeof onProgress !== "function") {
      return reject(
        new Error(`${missingParamsMessage} callbackProgress function`),
      );
    }

    const { headers, body, method } = options;
    if (typeof method !== "string") {
      return reject(new Error(`${missingParamsMessage} method`));
    }
    if (!isObject(headers)) {
      return reject(new Error(`${missingParamsMessage} headers`));
    }

    let uri = url;
    let sendBody = null;
    let { params } = options;
    let setHeaders = _.cloneDeep(headers);
    if (isObject(body)) {
      try {
        sendBody = typeof body === "string" ? body : JSON.stringify(body);
        setHeaders = {
          ...setHeaders,
          "Content-length": sendBody.length,
        };
      } catch (e) {
        // continue
      }
    }

    if (typeof params === "string") {
      try {
        params = JSON.parse(params);
      } catch (e) {
        // continue
      }
    }

    if (isObject(params)) {
      sendBody = null;
      const searchParams = new URLSearchParams(params);
      uri = `${url}?${searchParams.toString()}`;
    }

    // eslint-disable-next-line
    const req = new XMLHttpRequest();
    req.open(method, uri, true);
    req.addEventListener("progress", event => onProgress(event, req));
    req.addEventListener("load", () => {
      try {
        const json = JSON.parse(req.response);
        resolve(json);
      } catch (e) {
        resolve(req.response);
      }
    });

    let withCredentials = false;
    Object.keys(setHeaders).forEach(headerKey => {
      req.setRequestHeader(headerKey, setHeaders[headerKey]);
      if (headerKey === "Authorization") withCredentials = true;
    });

    req.withCredentials = withCredentials;
    req.send(sendBody);
  });
}
