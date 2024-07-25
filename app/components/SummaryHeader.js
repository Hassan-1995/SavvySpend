import React from "react";

import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function SummaryHeader({ labelOne, labelTwo, totalLabelOne, totalLabelTwo }) {
  const remainingBalance = totalLabelOne - totalLabelTwo;
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>Total {labelOne}</AppText>
        <AppText style={styles.summaryValue}>
          Rs {totalLabelOne.toLocaleString()}
        </AppText>
      </View>
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>Total {labelTwo}</AppText>
        <AppText style={styles.summaryValue}>
          Rs {totalLabelTwo.toLocaleString()}
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
          Rs {Math.abs(remainingBalance).toLocaleString()}
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
