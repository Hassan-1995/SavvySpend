import React, { useEffect, useState } from "react";
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
import IncomeTable from "../components/IncomeTable";
import SummaryHeader from "../components/SummaryHeader";
import EntryRow from "../components/EntryRow";
import EditDetailsScreen from "./EditDetailsScreen";

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

function IncomeScreen(props) {
  const [categories, setCategories] = useState([]);

  const [incomes, setIncomes] = useState([]);
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);
  const [editItem, setEditItem] = useState([]);

  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadIncomeTable();
    loadCategoriesTable();
  }, [refresh]);

  const loadIncomeTable = async () => {
    const response = await incomesApi.getAllIncomesInCurrentMonth(user_id);
    if (response.data.length > 0) {
      setIncomes(response.data);
      setFilteredIncomeData(response.data);
    } else {
      setIncomes([]);
      setFilteredIncomeData([]);
    }
  };
  const loadCategoriesTable = async () => {
    const response = await categoriesApi.getAllContentFromCategories();
    setCategories(response.data);
  };
  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const calculateTotalAmount = (incomes) => {
    return incomes.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };
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

  const addIncome = async (data, value) => {
    toogleAddModal();
    if (typeof value === "string") {
      try {
        const categoryData = {
          name: value,
          type: "Income",
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
      const response = await incomesApi.addNewRowInIncomes(1, data);
      console.log("Income added successfully", response);
    } catch (error) {
      console.error("Error adding expense", error);
    }
    refreshScreen();
  };

  const pressedRow = (rowItems) => {
    toogleEditModal();
    setEditItem(rowItems);
  };
  const editIncome = async (updatedData) => {
    const data = {
      ...editItem,
      amount: updatedData.amount,
      description: updatedData.description,
    };
    try {
      const response = await incomesApi.updateRowInIncome(
        editItem.income_id,
        data
      );
      console.log("Income added successfully", response);
    } catch (error) {
      console.error("Error adding expense", error);
    }
    refreshScreen();
  };

  const deleteIncome = async (income_id) => {
    console.log(income_id);
    const response = await incomesApi.deleteRowFromIncome(income_id);
    refreshScreen();
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Incomes</AppText>
      </View>

      <SummaryHeader totalExpenses={totalIncomes} totalBudget={2000} />

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
          <AppText style={styles.subHeader}>Incomes</AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={styles.links}>Add Income</AppText>
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

        {filteredIncomeData.length > 0 ? (
          <IncomeTable
            assets={filteredIncomeData}
            onPressingEachRow={pressedRow}
          />
        ) : (
          <AppText>No data for the selected month</AppText>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalAddVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addIncome(newData, categoryID)}
          categoryOptions={categories}
          closeModal={toogleAddModal}
          title="Income"
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
      >
        <EditDetailsScreen
          assets={editItem}
          closeModal={toogleEditModal}
          onEdit={(updatedData) => editIncome(updatedData)}
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

export default IncomeScreen;
