import React from "react";
import { BarChart } from "react-native-chart-kit";

import { StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  // backgroundGradientFrom: "#1E2923",
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  // backgroundGradientTo: "#08130D",
  backgroundGradientTo: "transparent",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 82, 82, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(16, 75, 125, ${opacity})`,
  decimalPlaces: 0,
  strokeWidth: 5, // optional, default 3
  barPercentage: 1,
  strokeWidth: 5,
};

function ChartComponent({ assets }) {
  const chartData = {
    labels: assets.map((item) => item.particulars),
    datasets: [
      {
        data: assets.map((item) => item.expenses),
      },
    ],
  };

  return (
    <BarChart
      data={chartData}
      width={width - 20}
      height={height * 0.3}
      yAxisLabel="Rs "
      // chartConfig={{
      //   backgroundColor: "transparent",
      //   backgroundGradientFrom: "transparent",
      //   backgroundGradientTo: "transparent",
      //   decimalPlaces: 0,
      //   color: (opacity = 0) => `rgba(0, 255, 000, ${opacity})`,
      //   labelColor: (opacity = 0) => `rgba(255, 0, 255, ${opacity})`,
      //   style: {
      //     borderRadius: 0,
      //   },
      //   propsForDots: {
      //     r: "0",
      //     strokeWidth: "0",
      //     // stroke: "#ffa726",
      //     stroke: "black",
      //   },
      // }}
      chartConfig={chartConfig}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 16,
    alignItems: "center",
  },
});

export default ChartComponent;
