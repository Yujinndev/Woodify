import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useCategories from "../hooks/categories";
import Loading from "../components/Loading";
import Colors from "../constants/Colors";

const AppHeader = ({ onCategoryChanged, passedIndex }) => {
  const { data, isLoading, isSuccess } = useCategories();
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    setActiveIndex(
      isNaN(passedIndex) || passedIndex === undefined ? 0 : passedIndex
    );
  }, [passedIndex]);

  useLayoutEffect(() => {
    const selected = itemsRef.current[activeIndex];
    if (selected) {
      selected.measureLayout(scrollRef.current, (x) => {
        scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
      });
    }
  }, [activeIndex]);

  const selectCategory = (index) => {
    setActiveIndex(index);
    onCategoryChanged(data[index].category_id);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && (
        <SafeAreaView
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: Colors.white,
          }}
        >
          <View style={styles.container}>
            <ScrollView
              horizontal
              ref={scrollRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                gap: 20,
                paddingHorizontal: 16,
              }}
            >
              {data.map((item, index) => (
                <TouchableOpacity
                  ref={(el) => (itemsRef.current[index] = el)}
                  key={index}
                  style={
                    activeIndex === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                  onPress={() => selectCategory(index)}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={activeIndex === index ? Colors.dark : Colors.grey}
                  />
                  <Text
                    style={
                      activeIndex === index
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 70,
    elevation: 0.5,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Montserrat-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "Montserrat-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 1.5,
    paddingBottom: 4,
  },
});

export default AppHeader;
