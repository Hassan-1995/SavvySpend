import React from "react";

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";

function BudgetTable({ assets, onClick }) {
  const handleEdit = (value) => {
    onClick(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <AppText style={[styles.cell, styles.headerCell]}>Particulars</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Budget</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Expense</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Net</AppText>
      </View>
      <ScrollView>
        {assets.map((item) => (
          <View key={item.id} style={styles.row}>
            <AppText style={styles.cell}>{item.name}</AppText>
            <AppText style={styles.cell}>Rs {item.expense}</AppText>
            <AppText style={styles.cell}>Rs {item.expense}</AppText>

            <AppText
              style={[
                styles.cell,
                { color: item.isPositive ? colors.income : colors.expense },
              ]}
            >
              Rs {Math.abs(item.expense - item.expense).toLocaleString()}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    borderBottomColor: colors.dark,
    paddingBottom: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    alignSelf: "center",
    alignItems: "flex-end",
    textAlign: "right",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BudgetTable;
