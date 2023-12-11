import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AppHeader from "../../components/AppHeader";
import Listings from "../../components/Listings";
import { AppBar } from "@react-native-material/core";
import Colors from "../../constants/Colors";

const Products = ({ route }) => {
  const { category } = route.params ? route.params : 0;
  const [selectedCategory, setSelectedCategory] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const onDataChanged = (category) => {
    category === 1 ? setSelectedCategory(null) : setSelectedCategory(category);
    setActiveIndex(category - 1); // Update the activeIndex state
  };

  useEffect(() => {
    onDataChanged(category);
  }, [category]);

  return (
    <>
      <AppBar
        title={"Woodify"}
        color={Colors.primary}
        style={{ position: "relative", height: 80, paddingTop: 25 }}
        titleStyle={{
          fontFamily: "Petemoss",
          fontSize: 39,
          color: "white",
        }}
      />
      <View style={styles.header}>
        <AppHeader
          onCategoryChanged={onDataChanged}
          passedIndex={activeIndex}
        />
      </View>
      <View style={styles.container}>
        <Listings category={selectedCategory} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  header: {
    height: 70,
  },
});

export default Products;
