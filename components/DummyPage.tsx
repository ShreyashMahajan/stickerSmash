import * as React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {FadeInRight} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

function Index() {
  const [mode, setMode] = React.useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = React.useState<"left" | "right">(
    "left"
  );
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const [loop, setLoop] = React.useState<boolean>(true);
  const [autoPlay, setAutoPlay] = React.useState<boolean>(false);
  const [autoPlayReverse, setAutoPlayReverse] = React.useState<boolean>(false);

  const data = React.useRef<number[]>([...new Array(6).keys()]).current;
  const viewCount = 5;

  return (
    <View style={{flex: 1}}>
      <Carousel
        style={{
          width: "100%",
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
        width={280}
        height={210}
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        mode={mode}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayReverse={autoPlayReverse}
        data={data}
        modeConfig={{
          snapDirection,
          stackInterval: mode === "vertical-stack" ? 8 : 18,
        }}
        customConfig={() => ({type: "positive", viewCount})}
        renderItem={({index}) => (
          <View>
            {" "}
            <Text> Page</Text>{" "}
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      ></View>
    </View>
  );
}

export default Index;
