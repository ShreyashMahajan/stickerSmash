import {StyleSheet, View, FlatList, Pressable} from "react-native";

import {router} from "expo-router";
import {Text, TextInput} from "react-native-paper";
import {Image} from "expo-image";

import {stocks} from "@/data";
import {StockCard} from "@/components/stockCard";

export default function HomeScreen() {
  return (
    <View style={{flex: 1, paddingTop: 30}}>
      <Pressable
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 50,
          marginBottom: 20,
        }}
        onPress={() => router.push("/search")}
      >
        <TextInput
          placeholder="Search Stock..."
          disabled
          mode="outlined"
          left={
            <TextInput.Icon
              icon={"magnify"}
              onPressIn={() => router.push("/search")}
            />
          }
        />
      </Pressable>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: "bold",
          marginLeft: 5,
          marginBottom: 5,
        }}
      >
        Available Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
        renderItem={({item}) => (
          <StockCard
            companyName={item.companyName}
            ticker={item.ticker}
            image={item.image}
            price={item.price}
            priceChange={item.priceChange}
            priceChangePercentage={item.priceChangePercentage}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
