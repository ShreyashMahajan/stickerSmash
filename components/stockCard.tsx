import {router} from "expo-router";
import React from "react";
import {Pressable, useWindowDimensions, View} from "react-native";
import {Image} from "expo-image";
import {Text} from "react-native-paper";
import {formatCurrency} from "@/utils/formatCurrency";

interface IStockCard {
  ticker: string;
  image: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
}

export const StockCard: React.FC<IStockCard> = ({
  ticker,
  image,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
}) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable
      style={{
        flex: 1,
        flexDirection: "row",
        height: 60,
        paddingHorizontal: 10,
        marginVertical: 10,
      }}
      onPress={() => router.push(`/${ticker}`)}
    >
      <Image
        source={image}
        style={{width: 50, height: 50, borderRadius: 100}}
        contentFit="contain"
      />
      <View
        style={{
          flexDirection: "row",
          width: width - 75,
          justifyContent: "space-between",
          paddingLeft: 15,
        }}
      >
        <View>
          <Text variant="titleMedium" style={{fontWeight: "bold"}}>
            {ticker}
          </Text>
          <Text variant="labelMedium">{companyName}</Text>
        </View>
        <View>
          <Text variant="titleMedium" style={{fontWeight: "bold"}}>
            {formatCurrency(price)}
          </Text>
          <Text
            variant="labelMedium"
            style={{
              color:
                priceChange < 0
                  ? "red"
                  : priceChange > 0
                  ? "lightgreen"
                  : "auto",
            }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
