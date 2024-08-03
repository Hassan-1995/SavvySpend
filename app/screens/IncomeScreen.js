import React, { useContext, useEffect, useState } from "react";
import incomesApi from "../api/incomes";
import expensesApi from "../api/expenses";
import budgetsApi from "../api/budgets";
import categoriesApi from "../api/categories";
import { LinearGradient } from "expo-linear-gradient";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import colors from "../config/colors";
import Icon from "../components/Icon";
import SummaryHeader from "../components/SummaryHeader";
import IncomeTable from "../components/IncomeTable";
import EntryRow from "../components/EntryRow";
import IncomeEditDetailsScreen from "./IncomeEditDetailsScreen";
import AuthContext from "../auth/context";
import TestingComponent from "../components/TestingComponent";
import SmallButtonWithIcon from "../components/SmallButtonWithIcon";

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

function IncomeScreen(props) {
  const { user } = useContext(AuthContext);

  const [incomes, setIncomes] = useState([]);
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncomeTable();
    loadExpenseTable();
    loadBudgetTable();
    loadCategoriesTable();
  }, []);

  const loadIncomeTable = async () => {
    setLoading(true);
    try {
      const response = await incomesApi.getAllIncomesInCurrentMonth(
        user.user_id
      );
      setIncomes(response.data);
      setFilteredIncomeData(response.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadExpenseTable = async () => {
    try {
      const response = await expensesApi.getAllExpensesInCurrentMonth(
        user.user_id
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error loading expense data:", error);
    }
  };

  const loadBudgetTable = async () => {
    try {
      const response = await budgetsApi.getAllBudgetsInCurrentMonth(
        user.user_id
      );
      if (response.data.length > 0) {
        setBudgets(response.data);
      } else {
        setBudgets([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load budgets");
    }
  };

  const loadCategoriesTable = async () => {
    try {
      const response = await categoriesApi.getAllContentFromCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading category data:", error);
    }
  };

  const calculateTotalAmount = (data) => {
    return data.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  const totalIncomes = calculateTotalAmount(incomes);
  const totalExpenses = calculateTotalAmount(expenses);
  const totalBudgets = calculateTotalAmount(
    budgets.filter((item) => item.type == "Income")
  );

  const toggleAddModal = () => {
    setModalAddVisible(!modalAddVisible);
  };

  const toggleEditModal = () => {
    setModalEditVisible(!modalEditVisible);
  };

  const addIncome = async (data, value) => {
    toggleAddModal();

    // console.log("Data: ", data);
    // console.log("Value: ", value);
    // if (typeof value === "string") {
    //   try {
    //     const categoryData = { name: value, type: "Income" };
    //     await categoriesApi.addNewRowInCategories(categoryData);
    //   } catch (error) {
    //     console.error("Error adding category", error);
    //   }
    // }

    try {
      await incomesApi.addNewRowInIncomes(user.user_id, data);
      loadIncomeTable();
    } catch (error) {
      console.error("Error adding income", error);
    }
  };

  const pressedRow = (rowItems) => {
    toggleEditModal();
    setEditItem(rowItems);
  };

  const editIncome = async (updatedData) => {
    const data = {
      ...editItem,
      amount: updatedData.amount,
      description: updatedData.description,
    };
    try {
      await incomesApi.updateRowInIncome(editItem.income_id, data);
      loadIncomeTable();
    } catch (error) {
      console.error("Error editing income", error);
    }
    toggleEditModal();
  };

  const deleteIncome = async (income_id) => {
    try {
      await incomesApi.deleteRowFromIncome(income_id);
      loadIncomeTable();
    } catch (error) {
      console.error("Error deleting income", error);
    }
  };

  return (
    <Screen>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.tertiary]}
        style={styles.banner}
      >
        <AppText style={styles.screenName}>Income</AppText>
        <AppText style={styles.remainingAmount}>
          Rs {totalIncomes.toLocaleString()} earned
        </AppText>
        <AppText style={styles.enteredAmount}>
          out of Rs {totalBudgets.toLocaleString()} budgeted income
        </AppText>
        <SmallButtonWithIcon
          title={"Add New Income"}
          color="primary"
          onPress={toggleAddModal}
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
      </LinearGradient>

      {/* <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Incomes</AppText>
      </View>

      <SummaryHeader
        labelOne={"Income"}
        totalLabelOne={totalIncomes}
        labelTwo={"Expense"}
        totalLabelTwo={totalExpenses}
      /> */}

      <View style={styles.content}>
        <ScrollView style={styles.container}>
          {/* <View style={styles.filterContainer}>
          <AppText style={styles.filterText}>
            For the month of:{" "}
            <AppText style={[styles.filterText, { color: colors.primary }]}>
              {currentMonthName} {new Date().getFullYear()}
            </AppText>
          </AppText>
        </View>

        <View style={styles.subHeaderContainer}>
          <AppText style={styles.subHeader}>Incomes</AppText>
          <View style={styles.addIncomeContainer}>
            <AppText style={styles.links}>Add Income</AppText>
            <TouchableOpacity onPress={toggleAddModal}>
              <Icon
                name={"circle-edit-outline"}
                iconColor={colors.primary}
                backgroundColor="transparent"
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View> */}

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : filteredIncomeData.length > 0 ? (
            <>
              <IncomeTable
                incomes={filteredIncomeData}
                onPressingEachRow={pressedRow}
              />
            </>
          ) : (
            <AppText>No data for the selected month</AppText>
          )}
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalAddVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addIncome(newData, categoryID)}
          categoryOptions={categories}
          closeModal={toggleAddModal}
          compare="Income"
          title="Income"
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
      >
        <IncomeEditDetailsScreen
          assets={editItem}
          closeModal={toggleEditModal}
          onEdit={editIncome}
          onDelete={deleteIncome}
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
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addIncomeContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 10,
    color: colors.white,
    fontWeight: "bold",
  },
  remainingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 25,
  },
  enteredAmount: {
    fontSize: 16,
    color: colors.white,
    marginTop: 16,
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
});

export default IncomeScreen;
