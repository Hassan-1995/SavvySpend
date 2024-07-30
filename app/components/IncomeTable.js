import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function IncomeTable({ assets, onPressingEachRow }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerCell}>Name</AppText>
        <AppText style={styles.headerCell}>Amount</AppText>
      </View>
      {assets.map((item) => (
        <View key={item.income_id}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => onPressingEachRow(item)}
          >
            <AppText style={[styles.cell, styles.nameCell]}>
              {item.name}
            </AppText>
            <AppText style={[styles.cell, styles.descriptionCell]}>
              Rs {(item.amount).toLocaleString()}
            </AppText>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default IncomeTable;
