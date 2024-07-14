import React from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";

function TableCol3({ assets }) {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <AppText style={[styles.cell, styles.headerCell]}>Date</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Particulars</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Expenses</AppText>
      </View>
      <ScrollView>
        {assets.map((item) => (
          <View key={item.id} style={styles.row}>
            <AppText style={styles.cell}>{item.date}</AppText>
            <AppText style={styles.cell}>{item.particulars}</AppText>
            <AppText style={styles.cell}>Rs {item.expenses}</AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  headerCell: {
    fontWeight: "bold",
  },
});

export default TableCol3;
