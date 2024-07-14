import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DashboardScreen from "./app/screens/DashboardScreen";
import BudgetScreen from "./app/screens/BudgetScreen";
import PromptBox from "./app/components/PromptBox";
import CreateBudgetScreen from "./app/screens/CreateBudgetScreen";

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
    // <DashboardScreen/>
    <BudgetScreen {...mockData}/>
    // <CreateBudgetScreen/>
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
