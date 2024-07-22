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
import MonthPicker from "../components/MonthPicker";
import IncomeTable from "../components/IncomeTable";
import SummaryHeader from "../components/SummaryHeader";
import EntryRow from "../components/EntryRow";

const user_id = 1;

function IncomeScreen(props) {
  const [categories, setCategories] = useState([]);

  const [incomes, setIncomes] = useState([]);
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadIncomeTable();
    loadCategoriesTable();
  }, [refresh]);

  const loadIncomeTable = async () => {
    const response = await incomesApi.getAllIncomes(user_id);
    setIncomes(response.data);
    setFilteredIncomeData(response.data);
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

  const filterByMonth = (data, month) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const itemMonth = itemDate.getMonth();
      return itemMonth === month;
    });
  };

  const handleMonthSelect = (month) => {
    if (month !== null) {
      const filtered = filterByMonth(incomes, month - 1);
      setFilteredIncomeData(filtered);
      if (month === 12) {
        const filtered = filterByMonth(incomes, 11);
        setFilteredIncomeData(filtered);
      }
    }
    if (month === "null") {
      loadIncomeTable();
      setFilteredIncomeData(incomes);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleModal = () => {
    toggleModal();
  };

  const addIncome = async (data, value) => {
    console.log(
      "before function: ",
      value,
      "and type of value is :",
      typeof value
    );
    toggleModal();
    if (typeof value === "string") {
      try {
        const categoryData = {
          name: value,
          type: "Income",
        };
        const response = await categoriesApi.addNewRowInCategories(categoryData);
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

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Incomes</AppText>
      </View>

      <SummaryHeader totalExpenses={totalIncomes} totalBudget={2000} />

      <ScrollView style={styles.container}>
        <View style={styles.filterContainer}>
          <AppText style={styles.filterText}>Apply filter</AppText>
          <View style={{ flex: 1 }}>
            <MonthPicker onMonthSelect={handleMonthSelect} />
          </View>
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
            <TouchableOpacity onPress={handleModal}>
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
          <IncomeTable assets={filteredIncomeData} />
        ) : (
          <AppText>No data for the selected month</AppText>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <EntryRow
          onClick={(newData, categoryID) => addIncome(newData, categoryID)}
          // onClick={(newData) => console.log(newData)}
          categoryOptions={categories}
          closeModal={toggleModal}
          title="Add Income"
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
