import React from "react";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import constants from "../config/constants";
import { colors } from "../config/theme";

// import MenuIcon from "./helpers/MenuIcon";
// import Sidebar from "./helpers/Sidebar";
// import navigationOptions from "./helpers/navigationOptions";

import Tickets from "./screens/Tickets";
import Discover from "./screens/Discover";
import Icon from "../styled/Icon";

// const headerTitleApp = "Decolar";

// createStackNavigator(
//   {
//     [constants.ROUTES.HOME_STACK]: {
//       screen: createDrawerNavigator(
//         { [constants.ROUTES.HOME]: Home, [constants.ROUTES.ABOUT]: Discover },
//         {
//           initialRouteName: constants.ROUTES.HOME,
//           // contentComponent: Sidebar,
//           contentOptions: {
//             activeTintColor: colors.COLOR_PRIMARY,
//           },
//         },
//       ),
//       navigationOptions: ({ navigation, ...others }) => {
//         const headerTitle = navigation.getParam(
//           "organizationName",
//           headerTitleApp,
//         );
//         return navigationOptions(headerTitle)({ ...others, navigation });
//       },
//     },
//   },
//   {
//     initialRouteName: constants.ROUTES.HOME_STACK,
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerTitle: headerTitleApp,
//       headerTitleAlign: "center",
//       headerBackTitleVisible: true,
//       headerLeft: () => <MenuIcon navigation={navigation} />,
//       headerStyle: { backgroundColor: colors.COLOR_BACKGROUND },
//       headerTintColor: colors.COLOR_PRIMARY,
//       headerTitleStyle: { fontWeight: "bold" },
//     }),
//   },
// );

export default createMaterialTopTabNavigator(
  {
    [constants.ROUTES.HOME]: {
      screen: Tickets,
      navigationOptions: {
        title: "Passagens",
        tabBarIcon: <Icon iconName="airplane" />,
      },
    },
    [constants.ROUTES.ABOUT]: {
      screen: Discover,
      navigationOptions: {
        title: "Descubra",
        tabBarIcon: <Icon iconName="compass" />,
      },
    },
  },
  {
    initialRouteName: constants.ROUTES.HOME,
    backBehavior: "history",
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: colors.COLOR_PRIMARY,
      inactiveTintColor: colors.COLOR_GRAY,
      showIcon: true,
      showLabel: true,
      scrollEnabled: true,
    },
  },
);
