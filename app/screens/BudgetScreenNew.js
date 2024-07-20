import React, { useEffect, useState } from "react";
import budgetsApi from "../api/budgets";

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
import AddBudget from "../components/AddBudget";
import CategoryTable from "../components/CategoryTable";
import MonthPicker from "../components/MonthPicker";

const user_id = 1;

function BudgetScreenNew(props) {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadData();
  }, [refresh]);
  
  const loadData = async () => {
    const response = await budgetsApi.getAllBudgets(user_id);
    setCategories(response.data);
    setFilteredData(response.data);
  };
  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const calculateTotalAmount = (categories) => {
    return categories.reduce((total, item) => {
      return total + parseFloat(item.amount);
    }, 0);
  };
  const totalBudget = calculateTotalAmount(categories);
  
  const filterByMonth = (categories, month) => {
    return categories.filter((item) => {
      const itemMonth = new Date(item.period).getMonth();
      return itemMonth === month;
    });
  };
  const handleMonthSelect = (month) => {
    if (month !== null) {
      const filtered = filterByMonth(categories, month);
      setFilteredData(filtered);
      if (month === 12) {
        const filtered = filterByMonth(categories, 0);
        setFilteredData(filtered);
      }
    }
    if (month === "null") {
      loadData();
      setFilteredData(categories);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleModal = () => {
    toggleModal();
  };

  const addBudget = async (data) => {
    console.log("BudgetScreenNew ", data);

    toggleModal();
    try {
      const response = await budgetsApi.addNewRowInBudgets(1, data);
      console.log("Budget added successfully", response);
    } catch (error) {
      console.error("Error adding budget", error);
    }
    refreshScreen();
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Categories</AppText>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>Total Budget</AppText>
          <AppText style={styles.summaryValue}>
            Rs {totalBudget.toLocaleString()}
          </AppText>
        </View>
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>Total Expenses</AppText>
          <AppText style={styles.summaryValue}>
            {/* Rs {totalExpenses.toLocaleString()} */}
          </AppText>
        </View>
        <View style={styles.summaryItem}>
          <AppText style={styles.summaryLabel}>Remaining Balance</AppText>
          <AppText
            style={[
              styles.summaryValue,
              // {
              //   color: remainingBalance < 0 ? colors.expense : colors.income,
              // },
            ]}
          >
            {/* Rs {remainingBalance.toLocaleString()} */}
          </AppText>
        </View>
      </View>
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
          <AppText style={styles.subHeader}>Utilities</AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={styles.links}>Add Utility</AppText>
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

        {filteredData.length > 0 ? (
          <CategoryTable assets={filteredData} />
        ) : (
          <AppText>No data for the selected month</AppText>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <AddBudget
          onClick={(newData) => addBudget(newData)}
          closeModal={toggleModal}
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

export default BudgetScreenNew;
