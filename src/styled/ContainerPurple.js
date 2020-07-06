import styled from "styled-components/native";

import { Platform } from "react-native";
import { colors, deviceWidth } from "../config/theme";

const ContainerPurple = styled.View.attrs({
  style: {
    maxWidth: Platform.OS !== "web" ? "auto" : "inherit",
  },
})`
  flex-grow: 1;
  width: ${deviceWidth}px;
  max-width: ${({ style: { maxWidth } }) => maxWidth};
  padding: 10px;
  background-color: ${colors.COLOR_PURPLE};
`;

export default ContainerPurple;
