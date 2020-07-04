// eslint-disable-next-line no-unused-vars
import { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

import { colors, deviceWidth } from "../config/theme";
import isObject from "../utils/object/isObject";

interface ScrollProps extends ScrollViewProps {
  paddingHorizontal: number;
  alignItems: string;
  justifyContent: string;
  contentContainerStyle: object & StyleProp<ViewStyle>;
}

export const ScrollContainer = styled.ScrollView.attrs(
  ({
    paddingHorizontal = 20,
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
    },
    keyboardShouldPersistTaps: "handled",
  }),
)``;
