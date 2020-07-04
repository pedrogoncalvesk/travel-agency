import isObject from "../object/isObject";
import convertObjectToFormData from "./convertObjectToFormData";

export default function getBody(data, headers) {
  if (!isObject(data) || !isObject(headers)) return data;

  let body;
  switch (headers["Content-Type"]) {
    case "multipart/form-data":
      body = convertObjectToFormData(data);
      break;
    case "application/json":
      body = JSON.stringify(data);
      break;
    default:
      body = data;
      break;
  }
  return body;
}
