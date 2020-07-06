import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/theme";
import isNumber from "../utils/number/isNumber";

const IconMaterial = styled(MaterialCommunityIcons).attrs(
  ({ name, color, size }) => ({
    size: isNumber(size) ? size : 20,
    color: color || colors.COLOR_PRIMARY,
    name,
  }),
)`
  align-items: center;
  justify-content: center;
  text-align: center;
  text-align-vertical: center;
`;

export default IconMaterial;
