import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";

function BudgetedIncomeTable({ budgets, incomes, onPressingEachRow }) {
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  const calculateTotalAmount = (budgets) => {
    return budgets.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };

  const totalIncomeOfEachBudget = (rowItems) => {
    const categoryData = incomes.filter(
      (item) => item.category_id === rowItems.category_id
    );
    const amount = calculateTotalAmount(categoryData);

    return amount;
  };

  return (
    <ScrollView>
      {budgets.map((item) => (
        <View key={item.budget_id}>
          <LinearGradient
            colors={["#c5cae9", colors.tertiary]}
            style={styles.container}
          >
            <View style={styles.header}>
              <View style={styles.row}>
                <Icon name={item.icon_name} backgroundColor={colors.primary} />
                <View style={styles.textContainer}>
                  <AppText style={styles.title}>{item.name}</AppText>
                  <AppText style={styles.subtitle}>Subtitle</AppText>
                </View>
              </View>
              <TouchableOpacity onPress={() => onPressingEachRow(item)}>
                <Icon
                  name={"chevron-right"}
                  backgroundColor={colors.secondary}
                  iconColor={colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.subHeader}>
              <View style={styles.summaryItem}>
                <AppText style={styles.summaryLabel}>Earned</AppText>
                <AppText style={styles.summaryValue}>
                  Rs {totalIncomeOfEachBudget(item)}
                </AppText>
              </View>
              <View style={styles.summaryItem}>
                <AppText style={styles.summaryLabel}>Left to earn</AppText>
                <AppText style={styles.summaryValue}>
                  Rs {item.amount - totalIncomeOfEachBudget(item)}
                </AppText>
              </View>
              <View style={styles.summaryItem}>
                <AppText style={styles.summaryLabel}>Budgeted</AppText>
                <AppText
                  style={[styles.summaryValue, { color: colors.income }]}
                >
                  Rs {parseInt(item.amount)}
                </AppText>
              </View>
            </View>

            <ProgressBar
              asset1={totalIncomeOfEachBudget(item)}
              asset2={item.amount}
            />
          </LinearGradient>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.medium,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default BudgetedIncomeTable;
