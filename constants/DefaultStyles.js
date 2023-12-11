import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  heading: { fontSize: 22, fontFamily: "Montserrat-b" },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-b",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-sb",
  },
  text: {
    fontSize: 14,
    fontFamily: "Montserrat",
    textAlign: "justify",
  },
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
    padding: 16,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
