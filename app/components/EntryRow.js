import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";
import MonthPicker from "./MonthPicker";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import AppPicker from "./AppPicker";

const budgetOptions = [
  // Your budget options here...
];

function EntryRow({
  closeModal,
  onClick,
  title = "Add something",
  compare,
  categoryOptions,
}) {
  const [budgetItem, setBudgetItem] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [period, setPeriod] = useState("");
  const [utilityDescription, setUtilityDescription] = useState(null);

  const [categoryID, setCategoryID] = useState();
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [others, setOthers] = useState();

  useEffect(() => {
    if (!inputValue || !period) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
    CategoryOptions();
  }, [inputValue, period]);

  const CategoryOptions = () => {
    const numberOfCategories = Math.max(
      ...categoryOptions.map((item) => item.category_id)
    );
    setCategoryID(numberOfCategories);
  };

  const categoryData = categoryOptions.filter((item) => item.type === compare);

  const handleMonthSelect = (month, year = 2024) => {
    const date = new Date(year, month, 0);
    const day = date.getDate();
    const formattedMonth = String(month).padStart(2, "0");
    setPeriod(`${year}-${formattedMonth}-${day}`);
  };

  function getLabelValue(label) {
    const existingItem = categoryOptions.find((item) => item.name === label);
    if (existingItem) {
      return existingItem.category_id;
    } else {
      const maxValue = Math.max(
        ...categoryOptions.map((item) => item.category_id)
      );
      const newValue = maxValue + 1;
      return newValue;
    }
  }

  const handleValueChange = (id, name) => {
    console.log("ID: ", id);
    console.log("Name: ", name);
    setBudgetItem(name);
    console.log(budgetItem);
    setOthers(name);
  };

  const handleEdit = () => {
    if (!isInputEmpty) {
      const labelValue = getLabelValue(budgetItem);
      const data = {
        nameValue: labelValue,
        month: period,
        amount: inputValue,
        description: utilityDescription,
      };
      if (labelValue >= categoryID) {
        onClick(data, budgetItem);
      } else {
        onClick(data, labelValue);
      }
    }
  };

  return (
    <LinearGradient
      colors={
        title === "Income"
          ? ["#006400", "#32CD32", "#98FF98"]
          : title === "Expense"
          ? ["#8B0000", "#E74C3C", "#F1948A"]
          : ["#0A3D62", "#2980B9", "#85C1E9"]
      }
      style={styles.container}
    >
      <View style={styles.flexibleContent}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={{ alignItems: "center" }}>
            <Icon
              name={
                title === "Income"
                  ? "arrow-down-bold-circle-outline"
                  : title === "Expense"
                  ? "arrow-up-bold-circle-outline"
                  : "clipboard-text-outline"
              }
              size={200}
              backgroundColor="transparent"
              iconColor={colors.white}
            />
          </View>
          <View
            style={[
              styles.promptBox,
              {
                borderColor:
                  title === "Income"
                    ? "#32cd32"
                    : title === "Expense"
                    ? "#dc3545"
                    : colors.primary,
              },
            ]}
          >
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>Add {title}</AppText>
              <TouchableOpacity onPress={() => closeModal()}>
                <Icon
                  name={"close"}
                  size={40}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <AppText>{title} options</AppText>
            {title === "Income" ? (
              <AppPicker
                dropdownOptions={categoryData}
                onValueChange={handleValueChange}
              />
            ) : others === "Others" ? (
              <AppTextInput
                onChangeText={(text) => setBudgetItem(text)}
                placeholder={"Add utility name."}
              />
            ) : (
              <AppPicker
                dropdownOptions={categoryData}
                onValueChange={handleValueChange}
              />
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AppText>Month</AppText>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <MonthPicker onMonthSelect={handleMonthSelect} />
              </View>
            </View>
            <AppTextInput
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              keyboardType="numeric"
              placeholder={"Please add expected finance."}
            />
            <AppTextInput
              value={utilityDescription}
              onChangeText={(text) => setUtilityDescription(text)}
              placeholder={"Description (optional)."}
            />

            <AppButton title={"Confirm"} onPress={handleEdit} />
            {isInputEmpty && (
              <AppText style={styles.error}>Input cannot be empty</AppText>
            )}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flexibleContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  promptBox: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlignVertical: "center",
    color: "#333",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  error: {
    marginTop: 5,
    fontSize: 14,
    color: colors.danger,
    fontStyle: "italic",
  },
});

export default EntryRow;
