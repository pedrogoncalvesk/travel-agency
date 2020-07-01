import { Platform } from "react-native";

export const StorageDriver = Platform.select({
  // eslint-disable-next-line no-undef
  web: () => window.localStorage,
  ios: () => require("@react-native-community/async-storage").default,
  android: () => require("redux-persist-expo-filesystem").default,
  default: require("@react-native-community/async-storage").default,
})();
