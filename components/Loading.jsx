import React from "react";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";

const Loading = () => {
  return <ActivityIndicator color={Colors.primary} style={{ padding: 16 }} />;
};

export default Loading;
