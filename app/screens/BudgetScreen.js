import React, { useContext, useEffect, useState } from "react";
import budgetsApi from "../api/budgets";
import expensesApi from "../api/expenses";
import categoriesApi from "../api/categories";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import colors from "../config/colors";
import Icon from "../components/Icon";
import BudgetTable from "../components/BudgetTable";
import SummaryHeader from "../components/SummaryHeader";
import EntryRow from "../components/EntryRow";
import BudgetEditDetailsScreen from "./BudgetEditDetailsScreen";
import AuthContext from "../auth/context";
import AppButton from "../components/AppButton";
import TestingComponent from "../components/TestingComponent";

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

function BudgetScreen(props) {
  const { user } = useContext(AuthContext);

  const [budgets, setBudgets] = useState([]);
  const [filteredBudgetData, setFilteredBudgetData] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);

  const [unAllocatedBudgets, setUnAllocatedBudgets] = useState([]);
  const [filteredUnAllocatedBudgetData, setFilteredUnAllocatedBudgetData] =
    useState([]);

  const [categories, setCategories] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadBudgetTable();
    loadExpenseTable();
    loadCategoriesTable();
    loadBudgetNotIncludedInExpenseTable();
  }, [refresh]);

  const loadBudgetTable = async () => {
    try {
      const response = await budgetsApi.getAllBudgetsInCurrentMonth(
        user.user_id
      );
      if (response.data.length > 0) {
        setBudgets(response.data);
        setFilteredBudgetData(response.data);
      } else {
        setBudgets([]);
        setFilteredBudgetData([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };
  const loadCategoriesTable = async () => {
    const response = await categoriesApi.getAllContentFromCategories();
    setCategories(response.data);
  };
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
  const loadBudgetNotIncludedInExpenseTable = async () => {
    const response =
      await budgetsApi.getAllExpensesByCurrentMonthNotIncludedInBudgets(
        user.user_id
      );
    if (response.data.length > 0) {
      setUnAllocatedBudgets(response.data);
      setFilteredUnAllocatedBudgetData(response.data);
    } else {
      setUnAllocatedBudgets([]);
      setFilteredUnAllocatedBudgetData([]);
    }
  };

  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const calculateTotalAmount = (budgets) => {
    return budgets.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };
  const totalBudgets = calculateTotalAmount(budgets);
  const totalExpenses = calculateTotalAmount(expenses);
  const totalUnAlllocatedBudget = calculateTotalAmount(unAllocatedBudgets);

  const toogleAddModal = () => {
    setModalAddVisible(!modalAddVisible);
  };
  const toogleEditModal = () => {
    setModalEditVisible(!modalEditVisible);
  };
  const handleAddModal = () => {
    toogleAddModal();
  };

  const addBudget = async (data, value) => {
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
        console.error("Error adding budget", error);
      }
    }

    try {
      const response = await budgetsApi.addNewRowInBudgets(user.user_id, data);
      console.log("Budget added successfully", response);
    } catch (error) {
      console.error("Error adding budget", error);
    }
    refreshScreen();
  };

  const pressedRow = (rowItems) => {
    toogleEditModal();
    setEditItem(rowItems);
    const categoryData = expenses.filter(
      (item) => item.category_id === rowItems.category_id
    );
    setFilteredExpenseData(categoryData);
  };
  const editBudget = async (updatedData) => {
    const data = {
      ...editItem,
      amount: updatedData.amount,
    };
    try {
      const response = await budgetsApi.updateRowInBudget(
        editItem.budget_id,
        data
      );
      console.log("Budget added successfully", response);
    } catch (error) {
      console.error("Error adding budget", error);
    }
    refreshScreen();
  };

  const deleteBudget = async (budget) => {
    const response = await budgetsApi.deleteRowFromBudget(budget.budget_id);
    refreshScreen();
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Budgets</AppText>
      </View>

      <SummaryHeader
        labelOne={"Budget"}
        totalLabelOne={totalBudgets}
        labelTwo={"Expense"}
        totalLabelTwo={totalExpenses}
      />
      <View style={styles.summaryItem}>
        <AppText style={styles.summaryLabel}>UnAllocated Budget: </AppText>
        <AppText style={styles.summaryValue}>
          Rs {totalUnAlllocatedBudget}
        </AppText>
      </View>

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
              <AppText style={styles.subHeader}>Budgets</AppText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText style={styles.links}>Add Budget</AppText>
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

            {filteredBudgetData.length > 0 ? (
              <>
                {/* <BudgetTable
                  assets={filteredBudgetData}
                  onPressingEachRow={pressedRow}
                /> */}
                <TestingComponent
                  budgets={filteredBudgetData}
                  expenses={expenses}
                  onPressingEachRow={pressedRow}
                />
              </>
            ) : (
              <AppText>No data for the selected month</AppText>
            )}
          </>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalAddVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addBudget(newData, categoryID)}
          categoryOptions={categories}
          closeModal={toogleAddModal}
          compare="Expense"
          title="Budget"
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
      >
        <BudgetEditDetailsScreen
          assets={editItem}
          budgetExpenses={filteredExpenseData}
          closeModal={toogleEditModal}
          onEdit={(updatedData) => editBudget(updatedData)}
          onDelete={deleteBudget}
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
    flexDirection: "row",
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

export default BudgetScreen;
