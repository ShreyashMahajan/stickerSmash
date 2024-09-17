import {StyleSheet, View, FlatList} from "react-native";

import {router} from "expo-router";
import {Text} from "react-native-paper";
import {Image} from "expo-image";

import {stocks} from "@/data";
import {StockCard} from "@/components/stockCard";

export default function HomeScreen() {
  return (
    <View style={{flex: 1, paddingTop: 30}}>
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
