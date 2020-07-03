import styled from "styled-components/native";

import { colors } from "../../../config/theme";

export const Text = styled.Text`
  color: ${colors.COLOR_WHITE};
`;

export const TextInput = styled.TextInput`
  border-width: 1px;
  padding: 8px;
  margin: 10px;
  width: 200px;
  border-color: ${colors.COLOR_GRAY};
`;

export const ButtonText = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  border-width: 1px;
  padding: 5px;
  margin: 5px;
  width: auto;
  border-radius: 5px;
  border-color: ${colors.COLOR_PRIMARY};
  background-color: ${colors.COLOR_PRIMARY};
`;
