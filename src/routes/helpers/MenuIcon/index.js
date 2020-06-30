import React, { useContext, useEffect } from "react";

import { colors } from "../../../config/theme";
import { GlobalContext } from "../../../config/sharedState";
import isObject from "../../../utils/object/isObject";
import navigationService from "../../../utils/navigationService";
import TopBarButton from "../../../styled/TopBarButton";
import Icon from "../../../styled/Icon";

const _toggleDrawer = nav => {
  const hasState = isObject(nav) && isObject(nav.state);
  if (hasState && nav.state.isDrawerOpen === true) {
    navigationService.closeDrawer();
  } else if (hasState && nav.state.isDrawerOpen === false) {
    navigationService.openDrawer();
  } else {
    navigationService.toggleDrawer();
  }
};

export default function MenuIcon({ navigation }) {
  const [globalState, setGlobalState] = useContext(GlobalContext)();

  useEffect(() => {
    if (
      navigation &&
      navigation.state.isDrawerOpen !== globalState.isDrawerOpen
    ) {
      _toggleDrawer({ state: { isDrawerOpen: !globalState.isDrawerOpen } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.isDrawerOpen]);

  useEffect(() => {
    if (
      navigation &&
      navigation.state.isDrawerOpen !== globalState.isDrawerOpen
    ) {
      setGlobalState({
        ...globalState,
        isDrawerOpen: navigation.state.isDrawerOpen,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.state]);

  return (
    <TopBarButton
      onPress={() => {
        setGlobalState({
          ...globalState,
          isDrawerOpen: !globalState.isDrawerOpen,
        });
      }}
    >
      <Icon iconName="menu" color={colors.COLOR_WHITE} size={20} />
    </TopBarButton>
  );
}
