import React from "react";

import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function ExpenseBar({ assets }) {
  return (
    <View style={styles.container}>
      <AppText style={{ color: colors.primary }}>
        Budget: {assets.budget.toLocaleString(Math.floor(assets.budget))}
      </AppText>
      <AppText style={{ color: colors.danger }}>
        Expenditure:{"Rs "}
        {assets.expenses.toLocaleString(Math.floor(assets.expenses))}
      </AppText>

      <View style={styles.goalInformationBar}>
        <View
          style={[
            styles.overlay,
            { width: `${(assets.expenses / assets.budget) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    overflow: "hidden",
    width: "100%",
  },
  goalInformationBar: {
    marginVertical: 10,
    alignSelf: "center",
    width: "100%",
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "90%",
    borderRadius: 15,
    margin: 3,
    backgroundColor: colors.danger,
  },
});

export default ExpenseBar;
