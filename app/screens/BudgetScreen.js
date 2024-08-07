import React, { useContext, useEffect, useState } from "react";
import budgetsApi from "../api/budgets";
import expensesApi from "../api/expenses";
import incomesApi from "../api/incomes";
import categoriesApi from "../api/categories";
import { LinearGradient } from "expo-linear-gradient";

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
import BudgetedExpenseTable from "../components/BudgetedExpenseTable";
import SummaryHeader from "../components/SummaryHeader";
import EntryRow from "../components/EntryRow";
import BudgetEditDetailsScreen from "./BudgetEditDetailsScreen";
import AuthContext from "../auth/context";
import AppButton from "../components/AppButton";
import SmallButtonWithIcon from "../components/SmallButtonWithIcon";
import BudgetedIncomeTable from "../components/BudgetedIncomeTable";

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
  const [filteredBudgetExpenseData, setFilteredBudgetExpenseData] = useState(
    []
  );
  const [filteredBudgetIncomeData, setFilteredBudgetIncomeData] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);

  const [unAllocatedBudgets, setUnAllocatedBudgets] = useState([]);
  const [filteredUnAllocatedBudgetData, setFilteredUnAllocatedBudgetData] =
    useState([]);

  const [categories, setCategories] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("expense");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadBudgetTable();
    loadExpenseTable();
    loadIncomeTable();
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
        // const [temp] = categoryOptions.filter((item) => item.category_id === id);
        setFilteredBudgetExpenseData(
          response.data.filter((item) => item.type === "Expense")
        );
        setFilteredBudgetIncomeData(
          response.data.filter((item) => item.type === "Income")
        );
      } else {
        setBudgets([]);
        setFilteredBudgetExpenseData([]);
        setFilteredBudgetIncomeData([]);
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
  const loadIncomeTable = async () => {
    const response = await incomesApi.getAllIncomesInCurrentMonth(user.user_id);
    if (response.data.length > 0) {
      setIncomes(response.data);
      setFilteredIncomeData(response.data);
    } else {
      setIncomes([]);
      setFilteredIncomeData([]);
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
  const totalExpenseBudgets = calculateTotalAmount(
    budgets.filter((item) => item.type == "Expense")
  );
  const totalIncomeBudgets = calculateTotalAmount(
    budgets.filter((item) => item.type == "Income")
  );
  const totalExpenses = calculateTotalAmount(expenses);
  const totalIncomes = calculateTotalAmount(incomes);
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
    console.log("rowItems: ", rowItems);
    toogleEditModal();
    setEditItem(rowItems);

    if (rowItems.type == "Expense") {
      const categoryData = expenses.filter(
        (item) => item.category_id === rowItems.category_id
      );
      setFilteredExpenseData(categoryData);
    }
    if (rowItems.type == "Income") {
      const categoryData = incomes.filter(
        (item) => item.category_id === rowItems.category_id
      );
      setFilteredExpenseData(categoryData);
    }
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

  const handleContent = (value) => {
    setScreen(value);
  };

  return (
    <Screen>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.tertiary]}
        style={styles.banner}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            height: "80%",
          }}
        >
          <AppText style={styles.screenName}>Budget</AppText>
          {screen === "expense" ? (
            <>
              <AppText style={styles.remainingAmount}>
                Rs {totalExpenseBudgets.toLocaleString()}{" "}
                <AppText style={styles.enteredAmount}>allocated</AppText>
              </AppText>
              <AppText style={styles.enteredAmount}>
                against Rs {totalIncomeBudgets.toLocaleString()} budgeted
                income.
              </AppText>
            </>
          ) : (
            <>
              <AppText style={styles.remainingAmount}>
                Rs {totalIncomeBudgets.toLocaleString()}{" "}
                <AppText style={styles.enteredAmount}>budgeted</AppText>
              </AppText>
              <AppText style={styles.enteredAmount}>
                out of which Rs {totalIncomes.toLocaleString()} earned.
              </AppText>
            </>
          )}

          {/* <AppText style={styles.screenName}>Budget</AppText>
        <AppText style={styles.remainingAmount}>
          Rs {(totalExpenseBudgets - totalExpenses).toLocaleString()} left
        </AppText>
        <AppText style={styles.enteredAmount}>
          out of Rs {totalExpenseBudgets.toLocaleString()} budgeted
        </AppText> */}

          <SmallButtonWithIcon
            title={"Create New Budget"}
            color="primary"
            onPress={handleAddModal}
          />

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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SmallButtonWithIcon
              name={"arrow-down-bold-circle-outline"}
              title={"Budgeted Incomes"}
              color={screen === "income" ? "secondary" : "primary"}
              onPress={() => handleContent("income")}
            />
            <SmallButtonWithIcon
              name={"arrow-up-bold-circle-outline"}
              title={"Budgeted Expenses"}
              color={screen === "expense" ? "secondary" : "primary"}
              onPress={() => handleContent("expense")}
            />
          </View>
        </View>
      </LinearGradient>

      {/* <LogoContainer />
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
      </View> */}

      <View style={styles.content}>
        <ScrollView style={styles.container}>
          {screen === "expense" ? (
            <>
              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <>
                  {/* <View style={styles.filterContainer}>
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
              </View> */}

                  {/* <View
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
              </View> */}

                  {filteredBudgetExpenseData.length > 0 ? (
                    <BudgetedExpenseTable
                      budgets={filteredBudgetExpenseData}
                      expenses={expenses}
                      onPressingEachRow={pressedRow}
                    />
                  ) : (
                    <AppText>No data for the selected month</AppText>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <>
                  {filteredBudgetIncomeData.length > 0 ? (
                    <BudgetedIncomeTable
                      budgets={filteredBudgetIncomeData}
                      incomes={incomes}
                      onPressingEachRow={pressedRow}
                    />
                  ) : (
                    <AppText>No data for the selected month</AppText>
                  )}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalAddVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addBudget(newData, categoryID)}
          categoryOptions={categories}
          closeModal={toogleAddModal}
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
    // padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    // marginRight: 10,
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
  banner: {
    height: "50%",
    backgroundColor: "blue",
    alignItems: "center",
  },
  screenName: {
    fontSize: 18,
    // marginTop: 0,
    color: colors.white,
    fontWeight: "bold",
  },
  remainingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    // marginTop: 20,
  },
  enteredAmount: {
    fontSize: 16,
    color: colors.white,
    // marginTop: 6,
  },
  content: {
    height: "60%",
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
});

export default BudgetScreen;
