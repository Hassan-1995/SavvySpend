import React from "react";

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";

function BudgetTable({ assets, onClick }) {
  // console.log(assets);
  const handleEdit = (value) => {
    onClick(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <AppText style={[styles.cell, styles.headerCell]}>Particulars</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Budget</AppText>
        <AppText style={[styles.cell, styles.headerCell]}>Edit</AppText>
      </View>
      <ScrollView>
        {assets.map((item) => (
          <View key={item.utility_id} style={styles.row}>
            <AppText style={[styles.cell, { textAlign: "left" }]}>
              {item.utility_name}
            </AppText>
            <AppText style={[styles.cell, { textAlign: "right" }]}>
              Rs {item.amount}
            </AppText>
            {/* <AppText style={styles.cell}>Rs {item.expense}</AppText> */}
            <TouchableOpacity
              style={styles.cell}
              onPress={() => handleEdit(item)}
            >
              <Icon
                name={"circle-edit-outline"}
                iconColor={colors.primary}
                backgroundColor="transparent"
                size={30}
              />
            </TouchableOpacity>
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
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BudgetTable;
