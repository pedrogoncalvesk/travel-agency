import { StyleSheet } from "react-native";

import { colors, deviceWidth } from "../../config/theme";

export const style = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    minWidth: deviceWidth < 400 ? 150 : 380,
    width: "80%",
    height: "auto",
    maxHeight: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    width: "85%",
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.COLOR_GRAY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.COLOR_PRIMARY,
  },
  buttonText: {
    flexGrow: 1,
    flexDirection: "row",
  },
  divider: {
    borderBottomColor: colors.COLOR_GRAY_BLACK,
    borderBottomWidth: 1,
    width: "100%",
    borderStyle: "solid",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    textAlign: deviceWidth < 400 ? "center" : "left",
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  closeButton: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.COLOR_PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.COLOR_PRIMARY,
  },
});
