import React from "react";

import { View, StyleSheet } from "react-native";
import ChartComponent from "../components/ChartComponent";

function ChartContentScreen({ incomeData, expenseData }) {
  return (
    <View style={styles.container}>
      <ChartComponent data={incomeData} title={"Income"} />
      <ChartComponent data={expenseData} title={"Expense"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChartContentScreen;
