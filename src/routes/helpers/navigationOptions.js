import navigationService from "../../utils/navigationService";

export default function navigationOptions(headerTitle, options = {}) {
  return ({ navigation, ...params }) => {
    const { routeName, key } = navigation.state;
    navigationService.updateRouteMap(routeName, key);

    if (typeof options === "function") {
      return { ...options({ navigation, ...params }), headerTitle };
    }
    return { ...options, headerTitle };
  };
}
