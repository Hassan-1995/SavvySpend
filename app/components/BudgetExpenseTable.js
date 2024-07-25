import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function BudgetExpenseTable({ assets, label }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <AppText style={styles.headerCell}>{label}</AppText>
      </View>
      {assets.map((item) => (
        <View key={item.expense_id} style={styles.itemContainer}>
          <View style={styles.row}>
            <AppText style={[styles.cell, styles.amountCell]}>
              Rs {item.amount}
            </AppText>
            <AppText style={[styles.cell, styles.dateCell]}>
              {formatDate(item.date)}
            </AppText>
          </View>
          <View style={styles.descriptionRow}>
            <AppText style={[styles.cell, styles.descriptionCell]}>
              {item.description}
            </AppText>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.white,
  },
  itemContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.light,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.medium,
  },
  descriptionRow: {
    backgroundColor: colors.light,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cell: {
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  amountCell: {
    flex: 1,
    backgroundColor: colors.secondary,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    textAlign: "center",
  },
  dateCell: {
    flex: 1,
    backgroundColor: colors.secondary,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    textAlign: "center",
  },
  descriptionCell: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    textAlign: "center",
  },
});

export default BudgetExpenseTable;
