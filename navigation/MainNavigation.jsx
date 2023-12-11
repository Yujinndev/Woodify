import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";

/* Screens */
import Home from "../screens/Main/Home";
import Products from "../screens/Main/Products";
import Customization from "../screens/Main/Customization";
import Profile from "../screens/Main/Profile";
import Cart from "../screens/Main/Cart";
import ItemDetail from "../screens/Main/ItemDetail";
import Login from "../screens/Guest/Login";
import Register from "../screens/Guest/Register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileTab = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          // presentation: "modal",
          title: "",

          headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0,
            height: 70,
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignItems: "center",
                margin: 4,
                marginLeft: 8,
                marginBottom: -20,
                backgroundColor: Colors.white,
                borderRadius: 100,
                padding: 8,
              }}
            >
              <Ionicons name="arrow-undo" size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          // presentation: "modal",
          title: "",

          headerStyle: {
            backgroundColor: Colors.primary,
            elevation: 0,
            height: 70,
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignItems: "center",
                margin: 4,
                marginLeft: 8,
                marginBottom: -20,
                backgroundColor: Colors.white,
                borderRadius: 100,
                padding: 4,
                height: 40,
                width: 40,
              }}
            >
              <Ionicons name="arrow-undo" size={28} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProductsTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="All Items"
    >
      <Stack.Screen name="All Items" component={Products} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 55,
            padding: 4,
          },
          headerTitle: "Woodify",
          headerTitleStyle: {
            fontFamily: "Petemoss",
            fontSize: 40,
            color: "white",
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontFamily: "Montserrat-sb",
                  fontSize: 10,
                  color: focused ? Colors.primary : Colors.grey,
                  paddingBottom: 5,
                }}
              >
                {route.name}
              </Text>
            );
          },
          // tabBarStyle: {
          //   backgroundColor: "#f4511e",
          // },
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === "Shop") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Products") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Customization") {
              iconName = focused ? "bonfire" : "bonfire-outline";
            } else if (route.name === "Me") {
              iconName = focused ? "person" : "person-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? Colors.primary : Colors.grey}
              />
            );
          },
        })}
      >
        {/* component == href in html */}
        <Tab.Screen name="Shop" component={Home} />
        <Tab.Screen
          name="Products"
          component={ProductsTab}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Customization"
          component={Customization}
          options={{ headerTitle: "Customization" }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{ headerTitle: "My cart" }}
        />
        <Tab.Screen
          name="Me"
          component={ProfileTab}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
