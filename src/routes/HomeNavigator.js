import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import constants from "../config/constants";
import { colors } from "../config/theme";

import MenuIcon from "./helpers/MenuIcon";
// import Sidebar from "./helpers/Sidebar";
import navigationOptions from "./helpers/navigationOptions";

import Home from "./screens/Home";

const headerTitleApp = "Decolar";

export default createStackNavigator(
  {
    [constants.ROUTES.HOME_STACK]: {
      screen: createDrawerNavigator(
        { [constants.ROUTES.HOME]: Home },
        {
          initialRouteName: constants.ROUTES.HOME,
          // contentComponent: Sidebar,
          contentOptions: {
            activeTintColor: colors.COLOR_PRIMARY,
          },
        },
      ),
      navigationOptions: ({ navigation, ...others }) => {
        const headerTitle = navigation.getParam(
          "organizationName",
          headerTitleApp,
        );
        return navigationOptions(headerTitle)({ ...others, navigation });
      },
    },
  },
  {
    initialRouteName: constants.ROUTES.HOME_STACK,
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: headerTitleApp,
      headerTitleAlign: "center",
      headerBackTitleVisible: true,
      headerLeft: () => <MenuIcon navigation={navigation} />,
      headerStyle: { backgroundColor: colors.COLOR_PRIMARY },
      headerTintColor: colors.COLOR_BACKGROUND,
      headerTitleStyle: { fontWeight: "bold" },
    }),
  },
);
