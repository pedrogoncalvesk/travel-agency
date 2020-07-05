import styled from "styled-components/native";

import { colors } from "../../../../config/theme";

export const Container = styled.View`
  position: relative;
`;

export const Text = styled.Text`
  color: ${colors.COLOR_WHITE};
`;

export const Button = styled.TouchableOpacity`
  border-width: 1px;
  padding: 5px;
  margin: 5px;
  width: auto;
  border-radius: 25px;
  border-color: ${colors.COLOR_RED};
  background-color: ${colors.COLOR_RED};
`;

export const ButtonText = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

export const ContainerBottomSearchBox = styled.View`
  position: absolute;
  top: 47px;
  width: 100%;
  height: auto;
  max-height: 150px;
  background-color: transparent;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 0;
  padding-top: 10px;
`;

export const List = styled.VirtualizedList.attrs({
  keyboardShouldPersistTaps: "always",
})``;

export const ListItemContainer = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-horizontal: 10px;
`;

export const ListItemText = styled.Text`
  font-size: 14px;
`;
