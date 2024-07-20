import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DashboardScreen from "./app/screens/DashboardScreen";
import BudgetScreen from "./app/screens/BudgetScreen";
import BudgetScreenNew from "./app/screens/BudgetScreenNew";
import PromptBox from "./app/components/PromptBox";
import CreateBudgetScreen from "./app/screens/CreateBudgetScreen";
import ItemCard from "./app/components/ItemCard";
import LoginScreen from "./app/screens/LoginScreen";
import TestingScreen from "./app/screens/TestingScreen";
import CategoryScreen from "./app/screens/CategoryScreen";
import AddBudget from "./app/components/AddBudget";
import ExpenseScreen from "./app/screens/ExpenseScreen";
import IncomeScreen from "./app/screens/IncomeScreen";

const mockData = {
  totalBudget: 100000,
  totalExpenses: 75000,
  categories: [
    { name: "Food", amount: 20000 },
    { name: "Transport", amount: 15000 },
    { name: "Utilities", amount: 10000 },
    { name: "Entertainment", amount: 30000 },
  ],
};

export default function App() {
  return (
    // <TestingScreen />

    // <LoginScreen/>
    // <DashboardScreen/>
    // <ItemCard/>
    // <BudgetScreen {...mockData}/>
    // <CreateBudgetScreen/>
    // <CategoryScreen />
    // <BudgetScreenNew />
    // <AddBudget />

    // <ExpenseScreen />
    <IncomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
