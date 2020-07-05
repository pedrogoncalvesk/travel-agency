/*
 * Provides universal color configs used in the src.
 * Provides universal fonts used in the src.
 */
import { Dimensions } from "react-native";

const tintColor = "#2c2c70";
const darkGrayColor = "#7a7a7a";
const grayColor = "#ccc";
const lightGrayColor = "#eee";
const whiteColor = "#fff";
const blackColor = "#000";

const colors = {
  COLOR_PRIMARY: tintColor,
  COLOR_SECONDARY: "#111",
  COLOR_BACKGROUND: whiteColor,
  COLOR_WHITE: whiteColor,
  COLOR_BLACK: blackColor,
  COLOR_TRANSPARENT: "rgba(255, 255, 255, 0)",
  COLOR_GRAY: grayColor,
  COLOR_GRAY_WHITE: lightGrayColor,
  COLOR_GRAY_BLACK: darkGrayColor,
  COLOR_SUCCESS: "#4CAF50",
  COLOR_GREEN: "#77ec80",
  COLOR_PURPLE: "#ddd5f6",
  COLOR_RED: "#f34e3e",
  COLOR_WARNING: "#d6b106",
  COLOR_YELLOW: "#f3cf26",
  COLOR_ERROR: "#F44336",
  COLOR_PLACEHOLDER: "#111111",
  COLOR_DARK_SEPARATOR: "#d4d4d4",
  COLOR_BLACK_TRANSP: "rgba(0, 0, 0, 0.7)",
  COLOR_GRAY_TRANSP: "rgba(67, 85, 85, 0.7)",
  COLOR_FIELD_STROKE: "rgb(3, 56, 142)",
  COLOR_FIELD_FILL: "rgba(3, 56, 142, 0.2)",
  COLOR_FIELD_SEL_STROKE: "rgb(141, 202, 68)",
  COLOR_FIELD_SEL_FILL: "rgba(141, 202, 68, 0.7)",
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const aspectRatio = deviceWidth / deviceHeight;

// const fonts = {
//   FONT_REGULAR: 'Roboto-Regular',
//   FONT_MEDIUM: 'Roboto-Medium'
// };

export { colors, deviceWidth, deviceHeight, aspectRatio };
