import React, {useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {Link, router, Tabs} from "expo-router";
import {Pressable, View} from "react-native";

import Colors from "@/constants/Colors";
import {useColorScheme} from "@/components/useColorScheme";
import {useClientOnlyValue} from "@/components/useClientOnlyValue";
import {TextInput} from "react-native-paper";
import {BottomNavigation, Text} from "react-native-paper";
import HomeScreen from ".";
import WatchlistScreen from "./watchlist";
import {NewsPage} from "./newsPage";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{marginBottom: -3}} {...props} />;
}

const HomeRoute = () => <HomeScreen />;
const WatchListRoute = () => <WatchlistScreen />;
const NewsRoute = () => <NewsPage />;
const VoiceSearch = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        color: "white",
      }}
    >
      Search By Voice (coming soon...)
    </Text>
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "watchlist",
      title: "Watchlist",
      focusedIcon: "briefcase",
      unfocusedIcon: "briefcase-outline",
    },
    {
      key: "news",
      title: "News",
      focusedIcon: "briefcase",
      unfocusedIcon: "briefcase-outline",
    },
    {
      key: "voice",
      title: "Voice",
      focusedIcon: "briefcase",
      unfocusedIcon: "briefcase-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    watchlist: WatchListRoute,
    news: NewsRoute,
    voice: VoiceSearch,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        getLazy={({route}) => route.lazy}
      />
    </>
  );
}
