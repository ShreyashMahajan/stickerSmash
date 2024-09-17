import {StockCard} from "@/components/stockCard";
import {useStore} from "@/Context/storeContext";
import {FlatList, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";

export default function SearchScreen() {
  const {searchQuery, searchedStocks} = useStore();
  console.log("🚀 ~ SarchScreen ~ searchQuery:", searchQuery, searchedStocks);

  if (!searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{fontWeight: "bold"}}>
          Search Stocks
        </Text>
      </View>
    );
  }

  if (searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{fontWeight: "bold"}}>
          No Stocks Found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item.ticker}
      data={searchedStocks}
      renderItem={({item}) => <StockCard {...item} />}
    />
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
