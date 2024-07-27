import React, { useContext, useEffect, useState } from "react";
import incomesApi from "../api/incomes";
import expensesApi from "../api/expenses";
import { View, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ChartComponent from "../components/ChartComponent";
import AuthContext from "../auth/context";
import BankCard from "../components/BankCard";

function DashboardScreen(props) {
  const { user } = useContext(AuthContext);

  const [incomesMonthly, setIncomesMonthly] = useState([]);
  const [incomesCurrent, setIncomesCurrent] = useState([]);
  const [expensesMonthly, setExpensesMonthly] = useState([]);
  const [expensesCurrent, setExpensesCurrent] = useState([]);

  const [status, setStatus] = useState("");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadIncomeTable();
    loadExpenseTable();
  }, [refresh]);

  useEffect(() => {
    const totalIncomes = calculateTotalAmount(incomesCurrent);
    const totalExpenses = calculateTotalAmount(expensesCurrent);
    const expenseToIncomeRatio = totalExpenses / totalIncomes;

    setStatus(loadStatus(expenseToIncomeRatio));
  }, [incomesCurrent, expensesCurrent]);

  const loadIncomeTable = async () => {
    try {
      const responseMonthly = await incomesApi.getAllIncomes(user.user_id);
      if (responseMonthly.data.length > 0) {
        setIncomesMonthly(responseMonthly.data);
      } else {
        setIncomesMonthly([]);
      }
    } catch (error) {
      console.log("Error getting Monthly incomes: ", error);
    }
    try {
      const responseCurrent = await incomesApi.getAllIncomesInCurrentMonth(
        user.user_id
      );
      if (responseCurrent.data.length > 0) {
        setIncomesCurrent(responseCurrent.data);
      } else {
        setIncomesCurrent([]);
      }
    } catch (error) {
      console.log("Error getting Current incomes: ", error);
    }
    refreshScreen();
  };
  const loadExpenseTable = async () => {
    try {
      const responseMonthly = await expensesApi.getAllExpenses(user.user_id);
      if (responseMonthly.data.length > 0) {
        setExpensesMonthly(responseMonthly.data);
      } else {
        setExpensesMonthly([]);
      }
    } catch (error) {
      console.log("Error getting Monthly expenses: ", error);
    }
    try {
      const responseCurrent = await expensesApi.getAllExpensesInCurrentMonth(
        user.user_id
      );
      if (responseCurrent.data.length > 0) {
        setExpensesCurrent(responseCurrent.data);
      } else {
        setExpensesCurrent([]);
      }
    } catch (error) {
      console.log("Error getting Current expenses: ", error);
    }
    refreshScreen();
  };
  const processData = (data) => {
    // Helper function to get month name from a date string
    const getMonthName = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString("default", { month: "long" });
    };

    // Initialize an object to store the sums
    const monthlySums = {};

    data.forEach((item) => {
      const month = getMonthName(item.date);
      const amount = parseFloat(item.amount);

      // Sum the amounts for each month
      if (!monthlySums[month]) {
        monthlySums[month] = 0;
      }
      monthlySums[month] += amount;
    });

    // Convert the object to an array of objects with month and amount
    const result = Object.keys(monthlySums).map((month) => ({
      month,
      amount: monthlySums[month].toFixed(2), // Format to 2 decimal places
    }));

    return result;
  };
  const calculateTotalAmount = (dashboard) => {
    return dashboard.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };

  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const incomeData = processData(incomesMonthly);
  const expenseData = processData(expensesMonthly);
  const totalIncomes = calculateTotalAmount(incomesCurrent);
  const totalExpenses = calculateTotalAmount(expensesCurrent);
  const remainingBalance = totalIncomes - totalExpenses;

  const loadStatus = (expenseToIncomeRatio) => {
    let msg = "";

    if (expenseToIncomeRatio > 1) {
      msg = "Your balance is below zero.";
    } else if (expenseToIncomeRatio > 0.7 && expenseToIncomeRatio <= 1) {
      msg = "Time to reassess your budget.";
    } else if (expenseToIncomeRatio > 0.4 && expenseToIncomeRatio <= 0.7) {
      msg = "Consider reviewing your expenses.";
    } else if (expenseToIncomeRatio > 0.2 && expenseToIncomeRatio <= 0.4) {
      msg = "Your balance is in the green.";
    } else if (expenseToIncomeRatio <= 0.2) {
      msg = "Your financial situation looks healthy.";
    }
    return msg;
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Dashboard</AppText>
      </View>
      <BankCard
        balance={remainingBalance}
        cardHolder={[user.firstName, " ", user.lastName]}
        status={status}
      />
      <ScrollView>
        <ChartComponent data={incomeData} title="Income" />
        <View style={{ borderBottomWidth: 2, borderStyle: "dashed" }} />
        <ChartComponent data={expenseData} title="Expense" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default DashboardScreen;
