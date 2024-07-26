import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import AppTextInput from "../components/AppTextInput";
import BudgetExpenseTable from "../components/BudgetExpenseTable";

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(assets.period);

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
    <View style={styles.container}>
      <View style={styles.promptBox}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={handleModal}
          >
            <Icon
              name={"close"}
              size={30}
              backgroundColor="transparent"
              iconColor={colors.danger}
            />
          </TouchableOpacity>
          <AppText style={styles.header}>{assets.name}</AppText>
          <AppTextInput
            value={editAmount}
            onChangeText={(text) => setEditAmount(text)}
            keyboardType="numeric"
            placeholder={"Add utility amount."}
            style={styles.subHeader}
          />
          <AppText style={styles.date}>
            <AppText>Date: </AppText>
            {formattedDate}
          </AppText>

          <View>
            <AppText>
              Allocated Budget: {parseFloat(allocatedBudget).toLocaleString()}
            </AppText>
            <AppText>
              Spend Budget: {parseFloat(allocatedBudget).toLocaleString()}
            </AppText>
          </View>

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

          <BudgetExpenseTable assets={budgetExpenses} label={assets.name} />

          <View style={styles.confirmButton}>
            <AppButton title={"Confirm"} onPress={handleUpdate} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  promptBox: {
    padding: 20,
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
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
});

export default BudgetEditDetailsScreen;
