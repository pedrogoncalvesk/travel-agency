import { YellowBox } from "react-native";
import { registerRootComponent } from "expo";

import App from "./src/App";

// eslint-disable-next-line no-undef
if (__DEV__) {
  YellowBox.ignoreWarnings([
    "Remote debugger is in a background tab which may cause apps to perform slowly.",
  ]);
}

registerRootComponent(App);
