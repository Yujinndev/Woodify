import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Divider } from "react-native-paper";
import axios from "axios";
import Colors from "../../constants/Colors";
import CustomInput from "../../components/CustomInput";
import useCategories from "../../hooks/categories";
import useTypes from "../../hooks/types";
import { defaultStyles } from "../../constants/DefaultStyles";

const Customization = () => {
  const { data: types } = useTypes();
  const { data: categories } = useCategories();
  const allCategories = categories.filter((_, index) => index !== 0);
  const categoriesRef = useRef([]);
  const typesRef = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [errorResponse, setErrorResponse] = useState();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errorResponse) {
      const timeoutId = setTimeout(() => {
        setErrorResponse(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [errorResponse]);

  useFocusEffect(
    React.useCallback(() => {
      reset();
      setSelectedCategory(0);
      setSelectedType(0);
    }, [reset])
  );

  const onSubmit = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstname: data.firstname,
      });

      const result = response.data;
      if (result[0].message === "Registration Failed") {
        setErrorResponse(result[0].message);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderFlatListItem = (
    item,
    index,
    refArray,
    selectedState,
    setSelectedState
  ) => (
    <TouchableOpacity
      ref={(element) => (refArray.current[index] = element)}
      key={index}
      style={
        selectedState === item.category_id || selectedState === item.type_id
          ? styles.itemSelected
          : styles.item
      }
      onPress={() =>
        setSelectedState(
          selectedState === item.category_id || selectedState === item.type_id
            ? null
            : item.category_id || item.type_id
        )
      }
    >
      <Text style={styles.text}>{item.name || item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={defaultStyles.container}>
      <View style={{ marginVertical: 10 }}>
        <Text style={defaultStyles.subtitle}>Price Range</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <CustomInput
            name="minimum"
            placeholder="Minimum"
            orientation="row"
            control={control}
            errorResponse={errorResponse}
            inputType={"numeric"}
            rules={{
              required: "Min is required",
              pattern: {
                value: /^[0-9]*$/, // Only allow numbers
                message: "Enter a Valid Price",
              },
            }}
          />
          <CustomInput
            name="maximum"
            placeholder="Maximum"
            orientation="row"
            control={control}
            errorResponse={errorResponse}
            inputType={"numeric"}
            rules={{
              required: "Max is required",
              pattern: {
                value: /^[0-9]*$/, // Only allow numbers
                message: "Enter a Valid Price",
              },
            }}
          />
        </View>
        <Divider theme={{ colors: { primary: Colors.offwhite } }} />
      </View>

      {/* Categories Section */}
      <View style={{ marginVertical: 10 }}>
        <Text style={defaultStyles.subtitle}>What category of furniture?</Text>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          numColumns={2}
          horizontal={false}
          data={allCategories}
          renderItem={({ item, index }) =>
            renderFlatListItem(
              item,
              index,
              categoriesRef,
              selectedCategory,
              setSelectedCategory
            )
          }
          keyExtractor={(item) => item.category_id.toString()}
        />
        <Divider theme={{ colors: { primary: Colors.offwhite } }} />
      </View>

      {/* Types Section */}
      <View style={{ marginVertical: 10 }}>
        <Text style={defaultStyles.subtitle}>What type of wood?</Text>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          numColumns={2}
          horizontal={false}
          data={types}
          renderItem={({ item, index }) =>
            renderFlatListItem(
              item,
              index,
              typesRef,
              selectedType,
              setSelectedType
            )
          }
          keyExtractor={(item) => item.type_id.toString()}
        />
        <Divider theme={{ colors: { primary: Colors.offwhite } }} />
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        theme={{ roundness: 1 }}
      >
        {loading ? "Processing ..." : "Request Customization"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 180,
    marginRight: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.offwhite,
    borderRadius: 8,
  },
  itemSelected: {
    width: 180,
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
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});

export default Customization;
