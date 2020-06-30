import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import constants from "../config/constants";
import navigationService from "../utils/navigationService";

const App = createStackNavigator(
  {
    [constants.ROUTES.HOME]: require("./HomeNavigator").default,
  },
  {
    initialRouteName: constants.ROUTES.HOME,
    headerMode: "none",
  },
);

const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      [constants.ROUTES.APP]: App,
    },
    {
      initialRouteName: constants.ROUTES.APP,
      header: null,
    },
  ),
);

export default function AppNavigator(props) {
  return (
    <RootStack
      ref={navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef);
      }}
      {...props}
    />
  );
}
