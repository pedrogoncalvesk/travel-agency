import styled from "styled-components/native";

import { colors, deviceHeight } from "../../../../config/theme";
import { getShadowStyle } from "../../../../styled/ShadowContainer";

export const Container = styled.View`
  position: relative;
`;

export const Text = styled.Text`
  color: ${colors.COLOR_BLACK};
`;

export const StrongText = styled.Text`
  color: ${colors.COLOR_BLACK};
  font-weight: bold;
`;

export const WhiteText = styled.Text`
  color: ${colors.COLOR_WHITE};
`;

export const GrayText = styled.Text`
  color: ${colors.COLOR_GRAY_BLACK};
`;

export const StrongGrayText = styled.Text`
  font-weight: bold;
  color: ${colors.COLOR_GRAY_BLACK};
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

export const ButtonText = styled(WhiteText)`
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

export const ContainerCards = styled.View`
  flex-direction: column;
  padding-horizontal: 10px;
  padding-vertical: 10px;
  background-color: ${colors.COLOR_BACKGROUND};
  flex-grow: 1;
  width: 100%;
`;

export const ContainerCard = styled.View.attrs({
  ...getShadowStyle(2),
})`
  margin-bottom: 10px;
  background-color: ${colors.COLOR_WHITE};
  border-radius: 7.5px;
  width: 100%;
  elevation: ${({ elevation }) => elevation};
  shadow-color: ${({ shadowColor }) => shadowColor};
  shadow-offset: ${({ shadowOffset: { width, height } }) =>
    `${width}px ${height}px`};
  shadow-opacity: ${({ shadowOpacity }) => shadowOpacity};
  shadow-radius: ${({ shadowRadius }) => shadowRadius}px;
`;

export const CardSection = styled.View`
  flex-direction: column;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.COLOR_GRAY};
`;

export const CardSectionRow = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.COLOR_GRAY};
`;

export const InlineDeparture = styled.View`
  flex-direction: row;
  margin-bottom: 7.5px;
`;

export const CardColumn = styled.View`
  flex-direction: column;
`;
