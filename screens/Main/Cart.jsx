import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../../utils/userStore";
import axios from "axios";
import { defaultStyles } from "../../constants/DefaultStyles";

const Cart = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const user = useUserStore((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getCartItems = async () => {
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        user_id: user[0].id, // Assuming user has an 'id' property
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching: ${error.message}`);
    }
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setTotal(0);
      refetch();
    } else if (isSuccess) {
      setCartItems(data);
    }
  }, [user, isSuccess, data, refetch]);

  const calculateItemTotal = (cartItem) => {
    return cartItem.price * cartItem.quantity;
  };

  useEffect(() => {
    let calculatedTotal = 0;

    if (cartItems.length > 0) {
      cartItems.forEach((cartItem) => {
        calculatedTotal += calculateItemTotal(cartItem);
      });

      setTotal(calculatedTotal);
    }
  }, [cartItems]);

  const renderRow = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.cartItemPhoto}
          resizeMode="contain"
        />

        <View style={styles.cartItemDetails}>
          <View style={styles.itemNamePrice}>
            <Text style={defaultStyles.subtitle}>{item.name}</Text>
            <Text style={defaultStyles.text}>
              ₱ {calculateItemTotal(item).toFixed(2)}
            </Text>
          </View>

          <Text style={defaultStyles.text}>x{item.quantity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cartCtn}>
      <View style={styles.cartDetailContainer}>
        {isSuccess && cartItems.length > 0 ? (
          <FlatList
            style={{ flex: 1, marginHorizontal: 2 }}
            showsVerticalScrollIndicator={false}
            data={cartItems}
            renderItem={renderRow}
            idExtractor={(item) => item.cart_id.toString()}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={defaultStyles.text}>
              Uh oh! No Items available in your cart
            </Text>
          </View>
        )}
      </View>

      <View style={styles.placeOrderCtn}>
        <Text style={defaultStyles.subtitle}>₱ {total.toFixed(2)}</Text>

        <TouchableOpacity
          // onPress={() => navigation.navigate('Home')}
          leading={<FontAwesome name="plus" size={18} color="#fff" />}
          style={styles.placeOrder}
        >
          <Text style={defaultStyles.subtitle}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartBtn: {
    justifyContent: "space-between",
    height: 45,
  },

  cartCtn: {
    flex: 1,
  },

  cartDetailContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 25,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 4,
    elevation: 1,
  },

  cartItem: {
    flexDirection: "row",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
  },

  cartItemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartItemPhoto: {
    width: 70,
    height: 60,
    borderRadius: 3,
    marginRight: 10,
  },

  placeOrder: {
    backgroundColor: Colors.secondary,
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  placeOrderCtn: {
    flexDirection: "row",
    borderTopWidth: 1,
    justifyContent: "space-between",
    height: 75,
    alignItems: "center",
    bottom: 15,
    marginHorizontal: 25,
    backgroundColor: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 1,
  },
});

export default Cart;
