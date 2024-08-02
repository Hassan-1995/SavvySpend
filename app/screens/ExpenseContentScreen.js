import React, { useContext, useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import ExpenseTable from "../components/ExpenseTable";
import AppText from "../components/AppText";
import expensesApi from "../api/expenses";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import ExpenseEditDetailsScreen from "./ExpenseEditDetailsScreen";
import MonthPicker from "../components/MonthPicker";
import Icon from "../components/Icon";

function ExpenseContentScreen(props) {
  const { user } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [month, setMonth] = useState(8);

  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenseTable();
  }, [month]);

  const loadExpenseTable = async () => {
    setLoading(true);
    try {
      const response = await expensesApi.getAllExpensesInPickedMonth(
        user.user_id,
        // 7
        month
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error loading expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expense_id) => {
    try {
      await expensesApi.deleteRowFromExpense(expense_id);
      loadExpenseTable();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const editExpense = async (updatedData) => {
    const data = {
      ...editItem,
      amount: updatedData.amount,
      description: updatedData.description,
    };
    try {
      await expensesApi.updateRowInExpense(editItem.expense_id, data);
      loadExpenseTable();
    } catch (error) {
      console.error("Error editing expense", error);
    }
    toggleEditModal();
  };

  const pressedRow = (rowItems) => {
    toggleEditModal();
    setEditItem(rowItems);
  };

  const toggleEditModal = () => {
    setModalEditVisible(!modalEditVisible);
  };
  const handleMonthSelect = (month, year = 2024) => {
    const date = new Date(year, month, 0);
    const day = date.getDate();
    const formattedMonth = String(month).padStart(1, "0");
    setMonth(formattedMonth);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <MonthPicker onMonthSelect={handleMonthSelect} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : expenses.length > 0 ? (
          <>
            <ExpenseTable expenses={expenses} onPressingEachRow={pressedRow} />
          </>
        ) : (
          <View style={styles.messageContainer}>
            <Icon
              name="chart-bar"
              size={100}
              iconColor={colors.white}
              backgroundColor={colors.expense}
            />
            <AppText style={styles.message}>
              No data for the selected month
            </AppText>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
      >
        <ExpenseEditDetailsScreen
          assets={editItem}
          closeModal={toggleEditModal}
          onEdit={editExpense}
          onDelete={deleteExpense}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {
    height: "65%",
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
  messageContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 20,
    marginTop: 30,
  },
  message: {
    fontSize: 16,
    marginTop: 20,
    color: colors.medium, // Use a color that is visible and consistent with your theme
    textAlign: "center", // Center the text
  },
});

export default ExpenseContentScreen;
