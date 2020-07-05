import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { colors } from "../config/theme";
import isNumber from "../utils/number/isNumber";

const Icon = styled(Ionicons).attrs(({ name: iconName, color, size }) => ({
  size: isNumber(size) ? size : 20,
  color: color || colors.COLOR_PRIMARY,
  name: Platform.OS === "ios" ? `ios-${iconName}` : `md-${iconName}`,
}))`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-align-vertical: center;
`;

export default Icon;
