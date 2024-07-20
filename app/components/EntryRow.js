import React, { useEffect, useState } from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";
import DropdownComponent from "./DropdownComponent";
import MonthPicker from "./MonthPicker";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

const budgetOptions = [
  { label: "Electricity", value: 1 },
  { label: "Water", value: 2 },
  { label: "Rent", value: 3 },
  { label: "Internet", value: 4 },
  { label: "Gas", value: 5 },
  { label: "Trash Collection", value: 6 },
  { label: "Cable TV", value: 7 },
  { label: "Mobile Phone", value: 8 },
  { label: "Home Security", value: 9 },
  { label: "Home Maintenance", value: 10 },
  { label: "Insurance", value: 11 },
  { label: "Sewer", value: 12 },
  { label: "Heating", value: 13 },
  { label: "Transport", value: 14 },
  { label: "Dining Out", value: 15 },
  { label: "Groceries", value: 16 },
];

function EntryRow({ closeModal, onClick, title = "Add somthing" }) {
  const [budgetItem, setBudgetItem] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [period, setPeriod] = useState("");
  const [utilityDescription, setUtilityDescription] = useState(null);

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    if (!inputValue || !period) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }, [inputValue, period]);

  const handleMonthSelect = (month, year = 2024) => {
    const date = new Date(year, month, 0);
    const day = date.getDate();
    const formattedMonth = String(month).padStart(2, "0");
    setPeriod(`${year}-${formattedMonth}-${day}`);
  };

  function getLabelValue(label) {
    // Check if the label exists in the budgetOptions array
    const existingItem = budgetOptions.find((item) => item.label === label);

    if (existingItem) {
      // If it exists, return the value
      return existingItem.value;
    } else {
      // If it doesn't exist, find the next incremental value
      const maxValue = Math.max(...budgetOptions.map((item) => item.value));
      const newValue = maxValue + 1;

      // Add the new label-value pair to the array
      budgetOptions.push({ label: label, value: newValue });

      // Return the new value
      return newValue;
    }
  }

  const handleEdit = () => {
    if (!isInputEmpty) {
      const labelValue = getLabelValue(budgetItem);
      const data = {
        nameValue: labelValue,
        month: period,
        amount: inputValue,
        description: utilityDescription,
      };
      console.log(data);
      onClick(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.promptBox}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <TouchableOpacity onPress={() => closeModal()}>
            <Icon
              name={"close"}
              size={30}
              backgroundColor="transparent"
              iconColor={colors.danger}
            />
          </TouchableOpacity>
        </View>

        <AppTextInput
          value={budgetItem}
          onChangeText={(text) => setBudgetItem(text)}
          placeholder={"Add utility name."}
        />

        <MonthPicker onMonthSelect={handleMonthSelect} />
        <AppTextInput
          value={inputValue}
          keyboardType="numeric"
          onChangeText={(text) => setInputValue(text)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  promptBox: {
    padding: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
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
