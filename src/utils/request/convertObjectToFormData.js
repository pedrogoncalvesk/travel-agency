export default function convertObjectToFormData(object) {
  // eslint-disable-next-line
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}
