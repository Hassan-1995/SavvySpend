import React from "react";
import expensesApi from "../api/expenses";

import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function SummaryHeader({ totalExpenses, totalBudget }) {
  const remainingBalance = totalExpenses - totalBudget;
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>Total Budget</AppText>
        <AppText style={styles.summaryValue}>
          Rs {totalBudget.toLocaleString()}
        </AppText>
      </View>
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>Total Expenses</AppText>
        <AppText style={styles.summaryValue}>
          Rs {totalExpenses.toLocaleString()}
        </AppText>
      </View>
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>Remaining Balance</AppText>
        <AppText
          style={[
            styles.summaryValue,
            {
              color: remainingBalance < 0 ? colors.expense : colors.income,
            },
          ]}
        >
          Rs {remainingBalance.toLocaleString()}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#888",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SummaryHeader;
