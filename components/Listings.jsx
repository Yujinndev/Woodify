import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Metrics } from "../constants/Metrics";
import { defaultStyles } from "../constants/DefaultStyles";
import Colors from "../constants/Colors";
import Loading from "./Loading";

const Listings = ({ category, data, isLoading, isSuccess }) => {
  console.log("🚀 ~ file: Listings.jsx:19 ~ Listings ~ data:", data);

  const navigation = useNavigation();
  const listRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const filteredItems =
    category && data
      ? data.filter((item) => item.category_id === category)
      : data;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Products", {
            screen: "ItemDetail",
            params: { item },
          });
        }}
      >
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsCtn}>
            <Text style={defaultStyles.title}>{item.name}</Text>
            <Text style={defaultStyles.subtitle}>
              ₱ {item.price.toFixed(2)}
            </Text>
            <Text numberOfLines={2} style={defaultStyles.text}>
              {item.description}
            </Text>
          </View>
          <Divider theme={{ colors: { primary: Colors.offwhite } }} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {isSuccess && (
        <FlatList
          style={{ width: Metrics.screenWidth, marginHorizontal: 2 }}
          ref={listRef}
          showsVerticalScrollIndicator={false}
          data={loading ? [] : filteredItems}
          renderItem={renderRow}
          idExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 4,
  },
  detailsCtn: {
    justifyContent: "center",
    flex: 1,
    gap: 4,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Listings;
