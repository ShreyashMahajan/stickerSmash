import {StyleProp, ViewStyle, View, Text, StyleSheet} from "react-native";
import {BarChart as Bar} from "react-native-gifted-charts";

export const BarChart = ({
  label,
  data,
  color,
  style,
}: {
  label: string;
  data: any;
  color: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const maxValue = Math.max(...data.map((i: any) => i.value));
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
      <Bar
        height={150}
        maxValue={maxValue * 1.5}
        barWidth={50}
        initialSpacing={0}
        rulesColor={"black"}
        barBorderRadius={4}
        frontColor={color}
        data={data}
        rotateLabel
        xAxisColor={"gray"}
        yAxisThickness={0}
        xAxisThickness={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
