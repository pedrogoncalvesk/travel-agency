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
import RootSafeContainer from "./styled/RootSafeContainer";
import isObject from "./utils/object/isObject";
// eslint-disable-next-line no-unused-vars
import { Country, CountryType } from "./utils/Country";

export default function App(props: AppProps): JSX.Element {
  const { skipLoadingScreen } = props;

  const [locale, setLocale] = useState(localeConfig);
  const [isReady, setIsReady] = useState(false);

  const _t = (scope: string | string[], options: any): string =>
    i18n.t(scope, { locale, ...options });

  const _getCountries = (): Array<CountryType> => {
    const allCountries = Country.getAll();
    return Object.keys(i18n.translations).reduce(
      (acc: Array<CountryType>, l: string) => {
        const country = allCountries.find((c: CountryType) => {
          if (
            Array.isArray(c.locales) &&
            c.locales.findIndex((lo: string) => lo === l) !== -1
          )
            return c;
          return undefined;
        });
        if (isObject(country)) {
          return [...acc, country];
        }
        return acc;
      },
      [],
    );
  };

  const _getCountry = (l: string): CountryType | undefined =>
    _getCountries().find(({ locales }) => {
      if (Array.isArray(locales)) {
        return locales.find(lo => lo === l);
      }
      return undefined;
    });

  const _cacheResourcesAsync = async () => {
    const imageArr = [images.icons.logo, images.icons.logoHeader];

    const cacheImages = imageArr.map(image =>
      Asset.fromModule(image).downloadAsync(),
    );

    await Promise.all([
      ...cacheImages,
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
    <RootSafeContainer>
      <StatusBar animated backgroundColor={colors.COLOR_BACKGROUND} />
      <AppNavigator
        screenProps={{
          t: _t,
          getCountries: _getCountries,
          getCountry: _getCountry,
          setLocale,
          locale,
        }}
      />
    </RootSafeContainer>
  );
}

interface AppProps {
  skipLoadingScreen: boolean;
}
