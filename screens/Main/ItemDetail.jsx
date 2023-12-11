import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { AppBar } from "@react-native-material/core";
import { defaultStyles } from "../../constants/DefaultStyles";
import { Metrics } from "../../constants/Metrics";
import Colors from "../../constants/Colors";
import axios from "axios";
import useUserStore from "../../utils/userStore";

const ItemDetail = ({ route }) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const { item } = route.params;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigation.navigate("Me", {
        screen: "Login",
      });

      return;
    }

    try {
      const response = await axios.post(`${API_URL}/addToCart`, {
        user_id: user[0].id,
        product_id: item.product_id,
        quantity: parseInt(quantity),
      });

      const result = response.data;
      ToastAndroid.show(result[0].message, ToastAndroid.SHORT);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={
        <View style={styles.main}>
          <AppBar
            color={Colors.primary}
            style={{ position: "relative", height: 80 }}
          />

          <View style={styles.nav}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-undo" size={24} color={"#000"} />
            </TouchableOpacity>
            <Text style={styles.title}>{item.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.detailsCtn}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name={item.icon} size={36} />
                <Text style={defaultStyles.title}>{item.category_name}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={defaultStyles.title}>{item.name}</Text>
                <Text style={defaultStyles.text}>{item.description}</Text>
                <Text style={defaultStyles.subtitle}>
                  ₱ {item.price.toFixed(2)}
                </Text>
                <Text style={defaultStyles.title}>Type: {item.type}</Text>
              </View>
            </View>
          </View>
        </View>
      }
      ListFooterComponent={
        <View style={defaultStyles.container}>
          <View style={styles.footer}>
            <View style={styles.quantityActions}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => quantity != 1 && handleDecrement()}
              >
                <MaterialCommunityIcons name={"minus"} size={18} />
              </TouchableOpacity>
              <View style={styles.btn}>
                <Text style={defaultStyles.title}>{quantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => quantity != item.stock_qty && handleIncrement()}
              >
                <MaterialCommunityIcons name={"plus"} size={18} />
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={() => handleAddToCart()}
              theme={{ roundness: 1 }}
              style={{ width: 210, height: 45, justifyContent: "center" }}
            >
              Add to Cart
            </Button>
          </View>
        </View>
      }
    />
    // <ScrollView>
    //   <AppBar
    //     color={Colors.primary}
    //     style={{ position: "relative", height: 80 }}
    //   />
    //   <View style={styles.nav}>
    //     <TouchableOpacity
    //       style={styles.roundButton}
    //       onPress={() => navigation.goBack()}
    //     >
    //       <Ionicons name="arrow-undo" size={24} color={"#000"} />
    //     </TouchableOpacity>
    //     <Text style={styles.title}>{item.name}</Text>
    //   </View>

    //   <View style={styles.divider} />

    //   <View style={styles.container}>
    //     <View style={styles.imgContainer}>
    //       <Image
    //         source={{ uri: item.image }}
    //         style={styles.image}
    //         resizeMode="contain"
    //       />
    //     </View>

    //     <View style={styles.detailsCtn}>
    //       <View style={styles.icon}>
    //         <MaterialCommunityIcons name={item.icon} size={36} />
    //         <Text style={defaultStyles.title}>{item.category_name}</Text>
    //       </View>
    //       <View style={{ flex: 1 }}>
    //         <Text style={defaultStyles.title}>{item.name}</Text>
    //         <Text style={defaultStyles.text}>{item.description}</Text>
    //         <Text style={defaultStyles.subtitle}>
    //           ₱ {item.price.toFixed(2)}
    //         </Text>
    //         <Text style={defaultStyles.title}>Type: {item.type}</Text>
    //       </View>
    //     </View>

    //     <View style={styles.footer}>
    //       <View style={styles.quantityActions}>
    //         <TouchableOpacity
    //           style={styles.btn}
    //           onPress={() => quantity != 1 && handleDecrement()}
    //         >
    //           <MaterialCommunityIcons name={"minus"} size={18} />
    //         </TouchableOpacity>
    //         <View style={styles.btn}>
    //           <Text style={defaultStyles.title}>{quantity}</Text>
    //         </View>

    //         <TouchableOpacity
    //           style={styles.btn}
    //           onPress={() => quantity != item.stock_qty && handleIncrement()}
    //         >
    //           <MaterialCommunityIcons name={"plus"} size={18} />
    //         </TouchableOpacity>
    //       </View>

    //       <Button
    //         mode="contained"
    //         onPress={() => handleAddToCart()}
    //         theme={{ roundness: 1 }}
    //         style={{ width: 210, height: 45, justifyContent: "center" }}
    //       >
    //         Add to Cart
    //       </Button>
    //     </View>
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: { height: Metrics.screenHeight - 180 },
  nav: {
    position: "absolute",
  },
  divider: {
    height: 10,
    backgroundColor: Colors.white,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
    zIndex: 10,
    top: 30,
    left: 10,
    elevation: 1,
  },
  title: {
    top: -3,
    left: 65,
    elevation: 1,
    zIndex: 10,
    fontFamily: "Montserrat-b",
    fontSize: 18,
    color: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  detailsCtn: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
    elevation: 1,
    padding: 16,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Metrics.screenWidth - 10,
    height: 350,
    borderRadius: 10,
  },
  icon: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  footer: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    bottom: 0,
  },
  quantityActions: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },

  btn: {
    backgroundColor: Colors.offwhite,
    width: 40,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
});

export default ItemDetail;
