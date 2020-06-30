import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

export default Platform.select({
  // eslint-disable-next-line no-undef
  web: window.localStorage,
  ios: AsyncStorage,
  android: ExpoFileSystemStorage,
});
