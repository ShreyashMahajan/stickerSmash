import {View, Text} from "react-native";
import React from "react";

interface ISingleNewsProps {
  item: any;
  index: number;
}

const SingleNews: React.FC<ISingleNewsProps> = ({item, index}) => {
  return (
    <View>
      <Text>SingleNews</Text>
    </View>
  );
};

export default SingleNews;
