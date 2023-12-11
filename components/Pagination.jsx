import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 25, 5],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.grey, Colors.white, Colors.grey],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    top: 190,
  },
  dot: {
    height: 5,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: Colors.grey,
  },
});
