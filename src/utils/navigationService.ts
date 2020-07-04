import { NavigationActions } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

let _navigator: any;
let _routeMap: object = {};

const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef;
};

const updateRouteMap = (routeName: string, key: any) => {
  _routeMap = { ..._routeMap, [routeName]: key };
};

const getRouteKey = (routeName: string) => {
  // @ts-ignore
  return _routeMap[routeName];
};

const navigate = (routeName: string, params?: any) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const goBack = (key: any) => {
  _navigator.dispatch(NavigationActions.back({ key }));
};

const setParams = (routeName: string, params: any) => {
  const key = getRouteKey(routeName);
  if (key) {
    _navigator.dispatch(NavigationActions.setParams({ params, key }));
  }
};

const toggleDrawer = () => _navigator.dispatch(DrawerActions.toggleDrawer());
const closeDrawer = () => _navigator.dispatch(DrawerActions.closeDrawer());
const openDrawer = () => _navigator.dispatch(DrawerActions.openDrawer());

export default {
  navigate,
  setParams,
  goBack,
  toggleDrawer,
  closeDrawer,
  openDrawer,
  setTopLevelNavigator,
  updateRouteMap,
  getRouteKey,
};
