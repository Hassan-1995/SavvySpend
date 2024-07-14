import React from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";

function TableCol4({ assets }) {
  const maxLength = 7;

  const truncateText = (text) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <AppText style={[styles.cell, styles.headerCell]}>Month</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Budget</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Expense</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Net</AppText>
      </View>
      <ScrollView>
        <View
          style={{
            width: "100%",
          }}
        >
          {assets.map((item) => (
            <View key={item.id} style={styles.row}>
              <AppText style={styles.cell}>{item.month}</AppText>
              <AppText style={styles.cell}>
                Rs {truncateText((item.budget).toLocaleString())}
              </AppText>
              <AppText style={styles.cell}>
                Rs {item.expenses.toLocaleString()}
              </AppText>
              <AppText
                style={[
                  styles.cell,
                  { color: item.isPositive ? "green" : "red" },
                ]}
              >
                {Math.abs(item.budget - item.expenses).toLocaleString()}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "transparent",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
    fontSize: 16,
    // textAlign: "right",
  },
  headerCell: {
    fontWeight: "bold",
  },
});

export default TableCol4;
