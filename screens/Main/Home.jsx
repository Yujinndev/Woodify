import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "../../components/Slider";
import { defaultStyles } from "../../constants/DefaultStyles";
import useCategories from "../../hooks/categories";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Listings from "../../components/Listings";
import useUserStore from "../../utils/userStore";

const Home = () => {
  const { data, isLoading, isSuccess } = useCategories();
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

            {isLoading && <Loading />}
            {isSuccess && (
              <FlatList
                style={{ marginVertical: 8 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
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
          <Listings />
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
