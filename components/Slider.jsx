import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import useItems from "../hooks/items";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { Metrics } from "../constants/Metrics";
import carousel from "../hooks/carousel";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  useEffect(() => {
    if (carousel && carousel.length > 0) {
      const intervalId = setInterval(() => {
        const nextIndex = (index + 1) % carousel.length;
        setIndex(nextIndex);

        // Scroll to the next index
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, 8000);

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [index, carousel]);

  const SlideItem = ({ item }) => {
    return (
      <>
        <Animated.Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.image}
        />
      </>
    );
  };
  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={carousel}
        renderItem={({ item }) => <SlideItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={carousel} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: Metrics.screenWidth,
    borderRadius: 4,
    padding: 12,
  },
});
