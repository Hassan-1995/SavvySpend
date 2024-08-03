import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import AppTextInput from "../components/AppTextInput";
import BudgetExpenseTable from "../components/BudgetExpenseTable";
import ProgressBar from "../components/ProgressBar";
import BudgetedIncomeTable from "../components/BudgetedIncomeTable";
import BudgetIncomeTable from "../components/BudgetIncomeTable";

function BudgetEditDetailsScreen({
  assets,
  closeModal,
  onEdit,
  onDelete,
  budgetExpenses,
}) {
  const [editAmount, setEditAmount] = useState(assets.amount);
  const [editDescription, setEditDescription] = useState(assets.description);

  const allocatedBudget = editAmount;

  const calculateTotalAmount = (budgets) => {
    return budgets.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };
  const totalExpenses = calculateTotalAmount(budgetExpenses);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(assets.updated_at);

  console.log("Assets: ", assets.type);
  console.log("BudgetExpenses: ", budgetExpenses);

  const handleModal = () => {
    closeModal();
  };

  const handleUpdate = () => {
    const editData = {
      amount: editAmount,
      category_id: assets.category_id,
      date: assets.date,
      description: editDescription,
    };
    handleModal();
    onEdit(editData);
  };

  const handleDelete = () => {
    handleModal();
    onDelete(assets);
  };

  return (
    <LinearGradient
      colors={["#0A3D62", "#2980B9", "#85C1E9"]}
      style={styles.container}
    >
      <View style={styles.flexibleContent}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name={assets.icon_name}
              size={200}
              backgroundColor="transparent"
              iconColor={colors.white}
            />
            <AppText style={styles.header}>{assets.name}</AppText>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                marginBottom: 20,
              }}
            >
              <AppText style={styles.subHeader}>Your budget is </AppText>
              <View
                style={{
                  backgroundColor: colors.secondary,
                  padding: 4,
                  borderRadius: 25,
                }}
              >
                <AppText style={[styles.subHeader, styles.highlight]}>
                  {" "}
                  Rs {parseInt(assets.amount).toLocaleString()}{" "}
                </AppText>
              </View>
              <AppText style={styles.subHeader}> in August</AppText>
            </View>
          </View>

          <View style={styles.promptBox}>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>{assets.name}</AppText>
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                onPress={handleModal}
              >
                <Icon
                  name={"close"}
                  size={40}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <AppTextInput
              value={editAmount}
              onChangeText={(text) => setEditAmount(text)}
              keyboardType="numeric"
              placeholder={"Add utility amount."}
              style={styles.subTitle}
            />
            <AppText style={styles.date}>
              <AppText>Date: </AppText>
              {formattedDate}
            </AppText>

            <View>
              <AppText>
                Targeted: {parseFloat(allocatedBudget).toLocaleString()}
              </AppText>
              <AppText>
                Achieved: {parseFloat(totalExpenses).toLocaleString()}
              </AppText>
            </View>

            <ProgressBar asset1={totalExpenses} asset2={allocatedBudget} />

            <View style={styles.buttonContainer}>
              <AppText style={styles.links}>Delete this entry.</AppText>
              <TouchableOpacity onPress={handleDelete}>
                <Icon
                  name={"trash-can-outline"}
                  size={40}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>
            {assets.type === "Expense" ? (
              <BudgetExpenseTable assets={budgetExpenses} label={assets.name} />
            ) : (
              <BudgetIncomeTable assets={budgetExpenses} label={assets.name} />
            )}

            <View style={styles.confirmButton}>
              <AppButton title={"Confirm"} onPress={handleUpdate} />
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  promptBox: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: colors.primary,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: colors.white,
  },
  description: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: colors.medium,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  confirmButton: {
    justifyContent: "flex-end",
    // flex: 1,
    // marginTop: 20,
  },
  links: {
    fontStyle: "italic",
    fontSize: 14,
    borderBottomColor: colors.secondary,
  },
  flexibleContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  iconContainer: {
    alignItems: "center",
  },
  highlight: {
    fontWeight: "bold",
  },
});

export default BudgetEditDetailsScreen;
