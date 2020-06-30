import StorageDriver from "./StorageDriver";

const get = (key: string, parse: boolean = true) => {
  return async () => {
    let item = null;
    try {
      item = await StorageDriver.getItem(key);
      if (parse) {
        item = JSON.parse(item);
      }
    } catch (e) {
      // continue
    }
    return item;
  };
};

const set = (key: string, stringify: boolean = true) => {
  return async (value: any) => {
    try {
      let newValue = value;
      if (stringify) {
        newValue = JSON.stringify(newValue);
      }
      const res = await StorageDriver.setItem(key, newValue).catch(() => false);
      return typeof res === "boolean" ? res : res === null || res === undefined;
    } catch (e) {
      // continue
    }
    return false;
  };
};

const remove = (key: string) => {
  return async () => {
    try {
      const res = await StorageDriver.removeItem(key).catch(() => false);
      return typeof res === "boolean" ? res : res === null || res === undefined;
    } catch (e) {
      // continue
    }
    return false;
  };
};

export default {
  get,
  remove,
  set,
};
