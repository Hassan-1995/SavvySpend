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
import authStorage from "../auth/storage";
import BankCard from "../components/BankCard";
import { LinearGradient } from "expo-linear-gradient";
import SmallButtonWithIcon from "../components/SmallButtonWithIcon";
import ChartContentScreen from "./ChartContentScreen";
import IncomeContentScreen from "./IncomeContentScreen";
import ExpenseContentScreen from "./ExpenseContentScreen";

function DashboardScreen(props) {
  const { user, setUser } = useContext(AuthContext);

  const [incomesMonthly, setIncomesMonthly] = useState([]);
  const [incomesCurrent, setIncomesCurrent] = useState([]);
  const [expensesMonthly, setExpensesMonthly] = useState([]);
  const [expensesCurrent, setExpensesCurrent] = useState([]);

  const [graphs, setGraphs] = useState(false);
  const [incomes, setIncomes] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [budgets, setBudgets] = useState(false);
  const [screen, setScreen] = useState("graph");

  const [status, setStatus] = useState("");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadIncomeTable();
    loadExpenseTable();
  }, []);

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

  const handleLogout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const handleContent = (value) => {
    console.log(value);
    setScreen(value);
  };

  return (
    <Screen>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.tertiary]}
        style={styles.banner}
      >
        <AppText style={styles.screenName}>Dashboard</AppText>
        <AppText style={styles.remainingAmount}>
          {[user.firstName, " ", user.lastName]}
        </AppText>

        {/* <View>
          <View style={styles.infoSection}>
            <AppText style={styles.infoTitle}>Email</AppText>
            <AppText style={styles.infoValue}>user@example.com</AppText>
          </View>

          <View style={styles.infoSection}>
            <AppText style={styles.infoTitle}>Phone Number</AppText>
            <AppText style={styles.infoValue}>123-456-7890</AppText>
          </View>

          <View style={styles.infoSection}>
            <AppText style={styles.infoTitle}>Date of Birth</AppText>
            <AppText style={styles.infoValue}>January 1, 1990</AppText>
          </View>
        </View> */}
        <View
          style={{
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <AppText
            style={{ fontWeight: "bold", color: colors.white, fontSize: 20 }}
          >
            Historical Data
          </AppText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ScrollView horizontal>
            <SmallButtonWithIcon
              name={"chart-line"}
              title={"Graphs"}
              color={screen === "graph" ? "secondary" : "primary"}
              onPress={() => handleContent("graph")}
            />
            <SmallButtonWithIcon
              name={"arrow-down-bold-circle-outline"}
              title={"Incomes"}
              color={screen === "income" ? "secondary" : "primary"}
              onPress={() => handleContent("income")}
            />
            <SmallButtonWithIcon
              name={"arrow-up-bold-circle-outline"}
              title={"Expenses"}
              color={screen === "expense" ? "secondary" : "primary"}
              onPress={() => handleContent("expense")}
            />
            {/* <SmallButtonWithIcon
              name={"clipboard-text-outline"}
              title={"Budgets"}
              color={screen === "budget" ? "secondary" : "primary"}
              onPress={() => handleContent("budget")}
            /> */}
          </ScrollView>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        {/* <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Dashboard</AppText>
      </View>
      <BankCard
      balance={remainingBalance}
      cardHolder={[user.firstName, " ", user.lastName]}
      status={status}
      onClick={handleLogout}
      /> */}
        <ScrollView>
          {/* <AppText>{screen}</AppText> */}

          {screen == "graph" ? (
            <ChartContentScreen
              incomeData={incomeData}
              expenseData={expenseData}
            />
          ) : screen == "income" ? (
            <IncomeContentScreen />
          ) : screen == "expense" ? (
            <ExpenseContentScreen />
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
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
  banner: {
    height: "50%",
    backgroundColor: "blue",
    alignItems: "center",
  },
  screenName: {
    fontSize: 18,
    marginTop: 10,
    color: colors.white,
    fontWeight: "bold",
  },
  remainingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 25,
  },
  enteredAmount: {
    fontSize: 16,
    color: colors.white,
    marginTop: 16,
  },
  content: {
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // borderWidth: 1,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    color: colors.secondary,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default DashboardScreen;
