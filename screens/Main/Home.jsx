import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchTrendingItems } from "../../hooks/items";
import useCategories from "../../hooks/categories";
import useUserStore from "../../utils/userStore";

/* COMPONENTS & THEMES */
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";
import Listings from "../../components/Listings";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/DefaultStyles";

const Home = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
  } = useCategories();
  const {
    data: trending,
    isLoading: isItemsLoading,
    isSuccess: isItemsSuccess,
  } = useQuery({
    queryKey: ["trend"],
    queryFn: () => fetchTrendingItems(),
  });

  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  console.log("🚀 ~ file: Home.jsx:25 ~ Home ~ user:", user);

  const RenderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Products", {
            screen: "All Items",
            params: { category: item.category_id },
          })
        }
      >
        <MaterialCommunityIcons name={item.icon} size={36} />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={defaultStyles.container}>
          <Slider />
          <View style={styles.category}>
            <Text style={defaultStyles.title}>Categories</Text>

            {isCategoriesLoading && <Loading />}
            {isCategoriesSuccess && (
              <FlatList
                style={{ marginVertical: 8 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={(index) => RenderRow(index)}
                keyExtractor={(item) => item.category_id.toString()}
              />
            )}
          </View>
          <Text style={defaultStyles.title}>Trending</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.container}>
          <Listings
            data={trending}
            isLoading={isItemsLoading}
            isSuccess={isItemsSuccess}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 100,
    marginRight: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: "Montserrat-sb",
    color: Colors.dark,
  },
  category: {
    height: 120,
    marginVertical: 16,
  },
  container: {
    alignItems: "center",
    position: "relative",
    flex: 1,
    marginTop: -16,
  },
});

export default Home;
