/**
 * Make Promise.all with callback progress
 * @param promises Array - The promise array
 * @param onProgress Function - The callback
 * @returns {Promise<Array>}
 */
export default async function promiseProgress(promises, onProgress) {
  const len = promises.length;
  let progress = 0;

  return Promise.all(
    promises.map(promise => {
      const inc = () => {
        progress += 1;
        onProgress(progress, len);
      };
      promise.then(inc);
      return promise;
    }),
  );
}
