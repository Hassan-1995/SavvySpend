import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function BankCard({ balance, cardHolder, status }) {
  const textColor =
    balance > 0 ? colors.income : balance < 0 ? colors.expense : colors.white;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.bankNameContainer}>
        <AppText style={styles.title}>SavvySpend</AppText>
      </View>
      <View style={styles.cardTypeContainer}>
        <AppText style={styles.subTitle}>Account Balance</AppText>
        <AppText style={[styles.accountBalance, { color: textColor }]}>
          {balance.toLocaleString(Math.floor(balance))}
        </AppText>
      </View>
      <View style={styles.statusContainer}>
        <AppText style={styles.status}>
          {/* Expense to Income ratio is {parseFloat(status.toFixed(3))} */}
          {status}
        </AppText>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.cardHolderContainer}>
          <AppText style={styles.label}>Welcome</AppText>
          <AppText style={styles.cardHolder}>{cardHolder}</AppText>
        </View>
        <View style={styles.expiryDateContainer}>
          <AppText style={styles.expiryDate}>VISA</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accountBalance: {
    fontSize: 18,
    color: "#32cd32",
    letterSpacing: 2,
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: 350,
    height: 180,
    alignSelf: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  bankNameContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  cardTypeContainer: {
    alignItems: "flex-end",
  },
  subTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  statusContainer: {
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    color: colors.white,
    letterSpacing: 1,
    marginVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolderContainer: {
    alignItems: "flex-start",
  },
  expiryDateContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  label: {
    fontSize: 12,
    color: "#fff",
  },
  cardHolder: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  expiryDate: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BankCard;
