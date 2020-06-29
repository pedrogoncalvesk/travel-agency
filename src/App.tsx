import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";

import Locale from "./locale";
import images from "./config/images";

export default function App(props: AppProps): JSX.Element {
  const { skipLoadingScreen } = props;

  const [locale, setLocale] = useState(Locale);

  const _t = (scope, options) => i18n.t(scope, { locale, ...options });

  const _cacheResourcesAsync = async () => {
    const imageArr = [images.icons.logo];

    const cacheImages = imageArr.map(image =>
      Asset.fromModule(image).downloadAsync()
    );

    return Promise.all([
      ...cacheImages,
      Font.loadAsync({
        ...Icon.Ionicons.font,
        ...Icon.MaterialCommunityIcons.font,
      }),
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

interface AppProps {
  skipLoadingScreen: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
