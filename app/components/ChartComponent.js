import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import colors from "../config/colors";
import AppText from "./AppText";

function ChartComponent({ data, title }) {
  const screenWidth = Dimensions.get("window").width;

  // Define the correct order of months
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sort the data based on the month order
  const sortedData = data.sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  // Extract month names and amounts from the sorted data
  const labels = sortedData.map((item) => item.month);
  const amounts = sortedData.map((item) => parseFloat(item.amount));

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Monthly {title} Data</AppText>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: amounts,
            },
          ],
        }}
        width={screenWidth - 20} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        fromZero={true}
        chartConfig={{
          backgroundColor: colors.primary,
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.5, // Adjust this value to make bars thinner or thicker
          barRadius: 0, // Optionally, you can also round the bars
          fillShadowGradient:
            title === "Income" ? colors.income : colors.expense, // Color for bars
          fillShadowGradientOpacity: 1,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default ChartComponent;
