import React from "react";
import { Image } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import constants from "../config/constants";
import { colors } from "../config/theme";
import images from "../config/images";
import MenuRight from "./helpers/MenuRight";
import Icon from "../styled/Icon";

import Tickets from "./screens/Tickets";
import Checkout from "./screens/Checkout";
import Discover from "./screens/Discover";

export default createStackNavigator(
  {
    [constants.ROUTES.HOME_STACK]: {
      screen: createMaterialTopTabNavigator(
        {
          [constants.ROUTES.TICKETS]: {
            screen: Tickets,
            navigationOptions: ({ screenProps: { t } }) => ({
              title: t("Tickets"),
              tabBarIcon: ({ tintColor }) => (
                <Icon name="airplane" color={tintColor} />
              ),
            }),
          },
          [constants.ROUTES.DISCOVER]: {
            screen: Discover,
            navigationOptions: ({ screenProps: { t } }) => ({
              title: t("Discover"),
              tabBarIcon: ({ tintColor }) => (
                <Icon name="compass" color={tintColor} />
              ),
            }),
          },
        },
        {
          initialRouteName: constants.ROUTES.TICKETS,
          backBehavior: "history",
          swipeEnabled: true,
          lazy: true,
          tabBarOptions: {
            tabStyle: {
              backgroundColor: colors.COLOR_BACKGROUND,
            },
            pressColor: colors.COLOR_PURPLE,
            activeTintColor: colors.COLOR_PRIMARY,
            inactiveTintColor: colors.COLOR_GRAY_BLACK,
            showIcon: true,
            showLabel: true,
            scrollEnabled: false,
          },
        },
      ),
    },
    [constants.ROUTES.CHECKOUT]: {
      screen: Checkout,
    },
  },
  {
    initialRouteName: constants.ROUTES.HOME_STACK,
    keyboardHandlingEnabled: true,
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTitle: () => (
        <Image
          style={{ width: 112, height: 24 }}
          source={images.icons.logoHeader}
          resizeMode="contain"
        />
      ),
      headerTitleAlign: "left",
      headerStyle: {
        backgroundColor: colors.COLOR_BACKGROUND,
        height: 40,
        borderBottomWidth: 0,
      },
      headerTintColor: colors.COLOR_PRIMARY,
      headerRight: ({ tintColor }) => (
        <MenuRight {...screenProps} tintColor={tintColor} />
      ),
    }),
  },
);
