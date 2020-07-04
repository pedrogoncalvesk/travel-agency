// eslint-disable-next-line no-unused-vars
import { Alert, AlertButton, AlertOptions } from "react-native";

export default function alert(
  title: string = "",
  message: string = "",
  params: AlertParams = {},
): void | Promise<void> {
  const { timeout, buttons, options } = params;

  if (!timeout) {
    return Alert.alert(title, message, buttons, options);
  }
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(Alert.alert(title, message, buttons, options));
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
