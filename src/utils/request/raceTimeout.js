import constants from "../../config/constants";

export default function raceTimeout(
  param,
  timeout = 7000,
  // eslint-disable-next-line no-undef
  asyncFunction = fetch,
) {
  let cancelled = false;
  let resolved = false;
  return Promise.race([
    // eslint-disable-next-line consistent-return
    new Promise((resolve, reject) => {
      try {
        // noinspection JSCheckFunctionSignatures
        return (
          !cancelled &&
          asyncFunction(...Object.keys(param).map(k => param[k]))
            .then(res => {
              if (!cancelled) {
                resolved = true;
                resolve(res);
              } else resolve();
            })
            .catch(err => reject(err))
        );
      } catch (e) {
        // continue
      }
    }),
    // eslint-disable-next-line consistent-return
    new Promise((_, reject) => {
      try {
        return (
          !resolved &&
          setTimeout(() => {
            if (!resolved) {
              cancelled = true;
              reject(new Error(constants.TIMEOUT));
            }
          }, timeout)
        );
      } catch (e) {
        // continue
      }
    }),
  ]);
}
