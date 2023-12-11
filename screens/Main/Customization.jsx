import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/DefaultStyles";
import { Divider } from "react-native-paper";

const Customization = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categoriesRef = useRef([]);
  const [selectedType, setSelectedType] = useState(0);
  const typesRef = useRef([]);

  const [categories, setCategories] = useState([
    { category_id: 1, name: "Category 1", icon: "android" },
    { category_id: 2, name: "Category 2", icon: "android" },
    { category_id: 3, name: "Category 3", icon: "android" },
    { category_id: 4, name: "Category 4", icon: "android" },
    { category_id: 5, name: "Category 5", icon: "android" },
  ]);

  const [types, setTypes] = useState([
    { type_id: 1, name: "Type 1", icon: "android" },
    { type_id: 2, name: "Type 2", icon: "android" },
    { type_id: 3, name: "Type 3", icon: "android" },
    { type_id: 4, name: "Type 4", icon: "android" },
    { type_id: 5, name: "Type 5", icon: "android" },
    { type_id: 6, name: "Type 6", icon: "android" },
  ]);

  return (
    <View style={defaultStyles.container}>
      <View style={{}}>
        <Text style={defaultStyles.title}>What category of furniture?</Text>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          numColumns={3}
          horizontal={false}
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              ref={(element) => (categoriesRef.current[index] = element)}
              key={index}
              style={
                selectedCategory == item.category_id
                  ? styles.itemSelected
                  : styles.item
              }
              onPress={() => setSelectedCategory(item.category_id)}
            >
              <MaterialCommunityIcons name={item?.icon} size={36} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.category_id.toString()}
        />
      </View>
      <Text style={defaultStyles.title}>SELECTED: {selectedCategory}</Text>
      <Divider theme={{ colors: { primary: Colors.offwhite } }} />
      <View>
        <Text style={defaultStyles.title}>What type of wood?</Text>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          numColumns={3}
          horizontal={false}
          data={types}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              ref={(element) => (typesRef.current[index] = element)}
              key={index}
              style={
                selectedType == item.type_id ? styles.itemSelected : styles.item
              }
              onPress={() => setSelectedType(item.type_id)}
            >
              <MaterialCommunityIcons name={item?.icon} size={36} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.type_id.toString()}
        />

        <Text style={defaultStyles.title}>SELECTED: {selectedType}</Text>
        <Divider theme={{ colors: { primary: Colors.offwhite } }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 125,
    marginRight: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.offwhite,
    borderRadius: 8,
  },
  itemSelected: {
    width: 125,
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
});

export default Customization;
