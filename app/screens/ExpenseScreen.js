import React, { useContext, useEffect, useState } from "react";
import expensesApi from "../api/expenses";
import incomesApi from "../api/incomes";
import categoriesApi from "../api/categories";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ExpenseTable from "../components/ExpenseTable";
import SummaryHeader from "../components/SummaryHeader";
import EntryRow from "../components/EntryRow";
import ExpenseEditDetailsScreen from "./ExpenseEditDetailsScreen";
import AuthContext from "../auth/context";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentMonth = new Date().getMonth();
const currentMonthName = monthNames[currentMonth];

function ExpenseScreen(props) {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadExpenseTable();
    loadIncomeTable();
    loadCategoriesTable();
  }, [refresh]);

  const loadExpenseTable = async () => {
    try {
      const response = await expensesApi.getAllExpensesInCurrentMonth(
        user.user_id
      );
      if (response.data.length > 0) {
        setExpenses(response.data);
        setFilteredExpenseData(response.data);
      } else {
        setExpenses([]);
        setFilteredExpenseData([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const loadCategoriesTable = async () => {
    try {
      const response = await categoriesApi.getAllContentFromCategories();
      setCategories(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load categories");
    }
  };

  const loadIncomeTable = async () => {
    try {
      const response = await incomesApi.getAllIncomesInCurrentMonth(
        user.user_id
      );
      if (response.data.length > 0) {
        setIncomes(response.data);
      } else {
        setIncomes([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load incomes");
    }
  };

  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const calculateTotalAmount = (expenses) => {
    return expenses.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };

  const totalExpenses = calculateTotalAmount(expenses);
  const totalIncomes = calculateTotalAmount(incomes);

  const toogleAddModal = () => {
    setModalAddVisible(!modalAddVisible);
  };

  const toogleEditModal = () => {
    setModalEditVisible(!modalEditVisible);
  };

  const addExpense = async (data, value) => {
    toogleAddModal();
    if (typeof value === "string") {
      try {
        const categoryData = {
          name: value,
          type: "Expense",
        };
        await categoriesApi.addNewRowInCategories(categoryData);
      } catch (error) {
        Alert.alert("Error", "Failed to add category");
      }
    }
    try {
      await expensesApi.addNewRowInExpenses(user.user_id, data);
      refreshScreen();
    } catch (error) {
      Alert.alert("Error", "Failed to add expense");
    }
  };

  const pressedRow = (rowItems) => {
    toogleEditModal();
    setEditItem(rowItems);
  };

  const editExpense = async (updatedData) => {
    const data = {
      ...editItem,
      amount: updatedData.amount,
      description: updatedData.description,
    };
    try {
      await expensesApi.updateRowInExpense(editItem.expense_id, data);
    } catch (error) {
      Alert.alert("Error", "Failed to update expense");
    }
    refreshScreen();
  };

  const deleteExpense = async (expense_id) => {
    try {
      await expensesApi.deleteRowFromExpense(expense_id);
      refreshScreen();
    } catch (error) {
      Alert.alert("Error", "Failed to delete expense");
    }
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Expenses</AppText>
      </View>

      <SummaryHeader
        labelOne={"Income"}
        totalLabelOne={totalIncomes}
        labelTwo={"Expense"}
        totalLabelTwo={totalExpenses}
      />

      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <View style={styles.filterContainer}>
              <AppText style={styles.filterText}>
                For the month of:{" "}
                <AppText
                  style={[
                    styles.filterText,
                    {
                      color: colors.primary,
                    },
                  ]}
                >
                  {currentMonthName} {new Date().getFullYear()}
                </AppText>
              </AppText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText style={styles.subHeader}>Expenses</AppText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText style={styles.links}>Add Expense</AppText>
                <TouchableOpacity onPress={toogleAddModal}>
                  <Icon
                    name={"circle-edit-outline"}
                    iconColor={colors.primary}
                    backgroundColor="transparent"
                    size={50}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {filteredExpenseData.length > 0 ? (
              <ExpenseTable
                assets={filteredExpenseData}
                onPressingEachRow={pressedRow}
              />
            ) : (
              <AppText>No data for the selected month</AppText>
            )}
          </>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalAddVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addExpense(newData, categoryID)}
          categoryOptions={categories}
          closeModal={toogleAddModal}
          compare="Expense"
          title="Expense"
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
      >
        <ExpenseEditDetailsScreen
          assets={editItem}
          closeModal={toogleEditModal}
          onEdit={(updatedData) => editExpense(updatedData)}
          onDelete={deleteExpense}
        />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  links: {
    fontStyle: "italic",
    fontSize: 14,
    color: colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
});

export default ExpenseScreen;
