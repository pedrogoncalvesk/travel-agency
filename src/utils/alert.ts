// eslint-disable-next-line no-unused-vars
import { Platform, Alert, AlertButton, AlertOptions } from "react-native";

export default function alert(
  title: string = "",
  message: string = "",
  params: AlertParams = {},
): void | Promise<void> {
  const { timeout, buttons, options } = params;

  if (!timeout && Platform.OS !== "web") {
    return Alert.alert(title, message, buttons, options);
  }
  if (!timeout && Platform.OS !== "web") {
    // eslint-disable-next-line no-undef,no-alert
    return window.alert(message);
  }

  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (Platform.OS !== "web") {
          resolve(Alert.alert(title, message, buttons, options));
        } else {
          // eslint-disable-next-line no-undef,no-alert
          resolve(window.alert(message));
        }
      }, timeout);
    } catch (e) {
      reject();
    }
  });
}

interface AlertParams {
  timeout?: number;
  buttons?: AlertButton[] | undefined;
  options?: AlertOptions | undefined;
}
