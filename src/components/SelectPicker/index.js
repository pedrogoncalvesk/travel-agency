import { Platform } from "react-native";
import SelectPickerAndroid from "./SelectPickerAndroid";
import SelectPickerIOS from "./SelectPickerIOS";

export default Platform.OS === "ios" ? SelectPickerIOS : SelectPickerAndroid;
