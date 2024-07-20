import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function CategoryTable({ assets, id }) {
  console.log(id);
  // console.log(assets);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerCell}>Name</AppText>
        <AppText style={styles.headerCell}>Amount</AppText>
      </View>
      {assets.map((item) => (
        // <View key={item.budget_id} style={styles.row}>
        <View key={item.expense_id} style={styles.row}>
          <AppText style={[styles.cell, styles.nameCell]}>{item.name}</AppText>
          <AppText style={[styles.cell, styles.descriptionCell]}>
            Rs {item.amount}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "transparent",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.tertiary,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    fontSize: 14,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  nameCell: {
    flex: 1,
    backgroundColor: colors.secondary,
    color: colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  descriptionCell: {
    flex: 2,
    backgroundColor: colors.primary,
    color: colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default CategoryTable;
