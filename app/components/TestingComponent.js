import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";

function TestingComponent({ budgets, expenses, onPressingEachRow }) {
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const calculateTotalAmount = (budgets) => {
    return budgets.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };

  const totalExpenseOfEachBudget = (rowItems) => {
    const categoryData = expenses.filter(
      (item) => item.category_id === rowItems.category_id
    );
    const amount = calculateTotalAmount(categoryData);

    return amount;
    // setFilteredExpenseData(categoryData);
  };

  return (
    <ScrollView>
      {budgets.map((item) => (
        <View style={styles.container} key={item.budget_id}>
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
              <AppText style={styles.summaryLabel}>Spent</AppText>
              <AppText style={styles.summaryValue}>
                Rs {totalExpenseOfEachBudget(item)}
              </AppText>
            </View>
            <View style={styles.summaryItem}>
              <AppText style={styles.summaryLabel}>Left to spend</AppText>
              <AppText style={styles.summaryValue}>
                Rs {item.amount - totalExpenseOfEachBudget(item)}
              </AppText>
            </View>
            <View style={styles.summaryItem}>
              <AppText style={styles.summaryLabel}>Limit</AppText>
              <AppText style={[styles.summaryValue, { color: colors.income }]}>
                Rs {parseInt(item.amount)}
              </AppText>
            </View>
          </View>

          <ProgressBar
            asset1={totalExpenseOfEachBudget(item)}
            asset2={item.amount}
          />
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
    backgroundColor: colors.tertiary,
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
    marginTop: 20,
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

export default TestingComponent;
