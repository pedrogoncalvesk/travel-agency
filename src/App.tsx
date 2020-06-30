import React, { useState } from "react";
import i18n from "i18n-js";
import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";

import localeConfig from "./config/locale";
import images from "./config/images";
import { colors } from "./config/theme";
import AppNavigator from "./routes";
import RootContainer from "./styled/RootContainer";

export default function App(props: AppProps): JSX.Element {
  const { skipLoadingScreen } = props;

  const [locale, setLocale] = useState(localeConfig);
  const [isReady, setIsReady] = useState(false);

  const _t = (scope: any, options: any) =>
    i18n.t(scope, { locale, ...options });

  const _cacheResourcesAsync = async () => {
    // const imageArr = [images.icons.logo];

    // const cacheImages = imageArr.map(image =>
    //   Asset.fromModule(image).downloadAsync(),
    // );

    await Promise.all([
      // ...cacheImages,
      Font.loadAsync({
        ...Icon.Ionicons.font,
        ...Icon.MaterialCommunityIcons.font,
      }),
    ]);
  };

  const _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  const _handleFinishLoading = () => setIsReady(true);

  if (!isReady && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  }

  return (
    <RootContainer>
      <StatusBar animated backgroundColor={colors.COLOR_PRIMARY} />
      <AppNavigator
        screenProps={{
          t: _t,
          setLocale,
          locale,
        }}
      />
    </RootContainer>
  );
}

interface AppProps {
  skipLoadingScreen: boolean;
}
