import styled from "styled-components/native";

import { colors } from "../config/theme";

const RootSafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.COLOR_BACKGROUND};
`;

export default RootSafeContainer;
