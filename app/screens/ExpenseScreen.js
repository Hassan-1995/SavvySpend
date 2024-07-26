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

const user_id = 1;

function ExpenseScreen(props) {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadExpenseTable();
    loadIncomeTable();
    loadCategoriesTable();
  }, [refresh]);

  const loadExpenseTable = async () => {
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
  };
  const loadCategoriesTable = async () => {
    const response = await categoriesApi.getAllContentFromCategories();
    setCategories(response.data);
  };

  const loadIncomeTable = async () => {
    const response = await incomesApi.getAllIncomesInCurrentMonth(user.user_id);
    if (response.data.length > 0) {
      setIncomes(response.data);
    } else {
      setIncomes([]);
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
  const handleAddModal = () => {
    toogleAddModal();
  };

  const addExpense = async (data, value) => {
    toogleAddModal();
    if (typeof value === "string") {
      try {
        const categoryData = {
          name: value,
          type: "Expense",
        };
        const response = await categoriesApi.addNewRowInCategories(
          categoryData
        );
        console.log("Category added successfully", response);
      } catch (error) {
        console.error("Error adding expense", error);
      }
    }

    try {
      const response = await expensesApi.addNewRowInExpenses(
        user.user_id,
        data
      );
      console.log("Expense added successfully", response);
    } catch (error) {
      console.error("Error adding expense", error);
    }
    refreshScreen();
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
      const response = await expensesApi.updateRowInExpense(
        editItem.expense_id,
        data
      );
      console.log("Expense added successfully", response);
    } catch (error) {
      console.error("Error adding expense", error);
    }
    refreshScreen();
  };

  const deleteExpense = async (expense_id) => {
    const response = await expensesApi.deleteRowFromExpense(expense_id);
    refreshScreen();
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
            <TouchableOpacity onPress={handleAddModal}>
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
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#888",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensure items are aligned vertically center
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
