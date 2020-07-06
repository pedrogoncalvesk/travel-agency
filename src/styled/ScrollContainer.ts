// eslint-disable-next-line no-unused-vars
import { Platform, ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

import { colors, deviceWidth } from "../config/theme";
import isObject from "../utils/object/isObject";

interface ScrollProps extends ScrollViewProps {
  paddingHorizontal: number;
  alignItems: string;
  justifyContent: string;
  contentContainerStyle: object & StyleProp<ViewStyle>;
}

const maxWidthWeb =
  Platform.OS !== "web"
    ? { maxWidth: "auto" }
    : {
        maxWidth: "500px",
        margin: deviceWidth >= 500 ? "auto" : 0,
        width: "auto",
      };

export const ScrollContainer = styled.ScrollView.attrs(
  ({
    paddingHorizontal = 50,
    alignItems = "center",
    justifyContent = "center",
    contentContainerStyle: s,
  }: ScrollProps) => ({
    contentContainerStyle: {
      ...(isObject(s) ? { ...s } : {}),
      flexGrow: 1,
      justifyContent,
      alignItems,
      backgroundColor: colors.COLOR_BACKGROUND,
      paddingHorizontal,
      width: deviceWidth,
      overflow: "visible",
      ...maxWidthWeb,
    },
    style: { ...maxWidthWeb },
    keyboardShouldPersistTaps: "handled",
  }),
)`
  height: 0;
`;
