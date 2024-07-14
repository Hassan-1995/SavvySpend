import React from "react";

import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import colors from "../config/colors";
import TableCol3 from "../components/TableCol3";
import ChartComponent from "../components/ChartComponent";
import ExpenseBar from "../components/ExpenseBar";
import BankCard from "../components/BankCard";

const data = [
  { id: "1", date: "2024-07-01", particulars: "Groceries", expenses: "150" },
  { id: "2", date: "2024-07-02", particulars: "Rent", expenses: "800" },
  { id: "3", date: "2024-07-03", particulars: "Utilities", expenses: "200" },
  { id: "4", date: "2024-07-04", particulars: "Transport", expenses: "50" },
];

const data2 = { budget: 50000, expenses: 20000 };

function DashboardScreen(props) {
  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Dashboard</AppText>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <BankCard
            balance={100000}
            cardHolder="Hammad Ahmed"
            status="Account in good standing."
          />

          <AppText style={styles.title}>Budget Summary:</AppText>
          <ExpenseBar assets={data2} />

          <AppText style={styles.title}>Quick Links</AppText>
          <View style={styles.quickLinksContainer}>
            <TouchableOpacity onPress={() => console.log("budget")}>
              <AppText style={styles.links}>Budget</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("expense")}>
              <AppText style={styles.links}>Expenses</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("report")}>
              <AppText style={styles.links}>Reports</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("goal")}>
              <AppText style={styles.links}>Goals</AppText>
            </TouchableOpacity>
          </View>

          <AppText style={styles.title}>Recent Expenses:</AppText>
          <TableCol3 assets={data} />

          <AppText style={styles.title}>Graph:</AppText>
          <ChartComponent assets={data} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    overflow: "hidden",
  },
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  account: {
    fontSize: 20,
    marginBottom: 5,
  },
  balance: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#32cd32",
    marginBottom: 20,
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  links: {
    fontStyle: "italic",
    color: colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
});

export default DashboardScreen;
