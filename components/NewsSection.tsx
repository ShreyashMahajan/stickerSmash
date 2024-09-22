import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Animated,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useNews} from "@/Context/newsContext";
import {ActivityIndicator, MD2Colors, Text} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import {TouchableOpacity} from "react-native-gesture-handler";
import axios from "axios";

const NewsSection = () => {
  //   const {isNewsLoading, news} = useNews();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");

  const viewCount = 9;

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("screen").width;

  const [news, setNews] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const ITEM_WIDTH = windowWidth;
  const ITEM_HEIGHT = windowHeight;
  const SPACING = 0;

  const fetchNews = async (pageNum: number) => {
    setIsNewsLoading(true);
    try {
      const url =
        "https://finnhub.io/api/v1/news?category=general&token=crnva5pr01qt44diuov0crnva5pr01qt44diuovg";
      const result = await axios.get(url);
      setNews((prevNews) => [...prevNews, ...result.data]);
      setIsNewsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      fetchNews(page + 1).finally(() => setLoadingMore(false));
    }
  };

  if (isNewsLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.green800}
          size="large"
        />
      </SafeAreaView>
    );
  }

  //  return (
  //    <SafeAreaView>
  //      <View style={styles.carousel}>
  //        <Carousel
  //          style={{
  //            width: windowWidth,
  //            height: windowHeight,
  //            alignItems: "center",
  //            justifyContent: "center",
  //          }}
  //          width={windowWidth}
  //          height={windowHeight}
  //          pagingEnabled={true}
  //          snapEnabled={true}
  //          mode={mode}
  //          loop={true}
  //          autoPlay={false}
  //          autoPlayReverse={false}
  //          data={news}
  //          modeConfig={{
  //            snapDirection,
  //            stackInterval: mode === "vertical-stack" ? 8 : 18,
  //          }}
  //          customConfig={() => ({type: "positive", viewCount})}
  //          renderItem={({item, index}: {item: any; index: number}) => (
  //            <View
  //              style={{
  //                backgroundColor: "black",
  //                height: windowHeight,
  //              }}
  //            >
  //              <Image
  //                source={{
  //                  uri: item.image,
  //                }}
  //                style={{
  //                  height: "45%",
  //                  resizeMode: "cover",
  //                  width: windowWidth,
  //                }}
  //              />
  //              <View style={styles.container}>
  //                <Text style={styles.title}>
  //                  Category:{index} {item.headline}
  //                </Text>
  //                <Text style={styles.description}>
  //                  Category:{index} {item.summary}
  //                </Text>
  //                <Text>
  //                  News by
  //                  <Text>{" " + item.source ?? "unknown"}</Text>
  //                </Text>
  //                <ImageBackground
  //                  blurRadius={30}
  //                  style={{
  //                    ...styles.footer,
  //                    width: windowWidth,
  //                  }}
  //                  source={{uri: item.image}}
  //                >
  //                  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
  //                    <Text
  //                      style={{
  //                        fontSize: 14,
  //                        color: "white",
  //                      }}
  //                    >
  //                      '{item.summary.slice(0, 45)}...'
  //                    </Text>
  //                    <Text
  //                      style={{
  //                        fontSize: 16,
  //                        fontWeight: "bold",
  //                        color: "white",
  //                      }}
  //                    >
  //                      Read More
  //                    </Text>
  //                  </TouchableOpacity>
  //                </ImageBackground>
  //              </View>
  //            </View>
  //          )}
  //        />
  //      </View>
  //    </SafeAreaView>
  //  );
  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        data={news}
        renderItem={({item, index}: {item: any; index: number}) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, -40],
            extrapolate: "clamp",
          });

          //   const opacity = scrollX.interpolate({
          //     inputRange,
          //     outputRange: [0.5, 1, 0.5],
          //     extrapolate: "clamp",
          //   });

          return (
            <Animated.View
              style={[
                styles.itemContainer,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginHorizontal: SPACING,
                },
                {transform: [{scale}, {translateY}]},
              ]}
            >
              <View
                style={{
                  backgroundColor: "black",
                  height: windowHeight,
                }}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{
                    height: "45%",
                    resizeMode: "cover",
                    width: windowWidth,
                  }}
                />
                <View style={styles.container}>
                  <Text style={styles.title}>
                    Category:{index} {item.headline}
                  </Text>
                  <Text style={styles.description}>
                    Category:{index} {item.summary}
                  </Text>
                  <Text>
                    News by
                    <Text>{" " + item.source ?? "unknown"}</Text>
                  </Text>
                  <ImageBackground
                    blurRadius={30}
                    style={{
                      ...styles.footer,
                      width: windowWidth,
                    }}
                    source={{uri: item.image}}
                  >
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                        }}
                      >
                        '{item.summary.slice(0, 45)}...'
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Read More
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              </View>
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore} // Fetch more when reaching end of the list
        onEndReachedThreshold={0.5} // Trigger more data fetch earlier
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              animating={true}
              color={MD2Colors.blue800}
              size="small"
            />
          ) : null
        }
        pagingEnabled // Enables "carousel-like" swiping behavior
        horizontal // For horizontal scrolling
        snapToInterval={ITEM_WIDTH + SPACING} // Snapping to each item
        decelerationRate="fast" // Momentum for smooth swiping
        bounces={false} // Prevent overscroll bounce
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    // transform: [{scaleX: -1}],
    backgroundColor: "black",
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    paddingBottom: 10,
  },
  footer: {
    height: 80,
    position: "absolute",
    bottom: 40,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  itemContainer: {
    // width: ITEM_WIDTH,
    // height: ITEM_HEIGHT,
    // marginHorizontal: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewsSection;
