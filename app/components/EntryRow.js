import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";
import MonthPicker from "./MonthPicker";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import DropdownComponent from "./DropdownComponent";
import DropdownComponentNew from "./DropdownComponentNew";

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

function EntryRow({
  closeModal,
  onClick,
  title = "Add something",
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

  const categoryData = categoryOptions.filter((item) => item.type === "Expense");

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
    <View style={styles.container}>
      <View style={styles.promptBox}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Add {title}</AppText>
          <TouchableOpacity onPress={() => closeModal()}>
            <Icon
              name={"close"}
              size={30}
              backgroundColor="transparent"
              iconColor={colors.danger}
            />
          </TouchableOpacity>
        </View>
        <AppText>Particulars</AppText>
        {title === "Income" ? (
          <DropdownComponentNew
            dropdownOptions={categoryData}
            // onValueChange={(value1, value2) => console.log(value1, value2)}
            onValueChange={handleValueChange}
          />
        ) : others === "Others" ? (
          <AppTextInput
            // value={budgetItem}
            onChangeText={(text) => setBudgetItem(text)}
            placeholder={"Add utility name."}
          />
        ) : (
          <DropdownComponentNew
            dropdownOptions={categoryData}
            // onValueChange={(value1, value2) => console.log(value1, value2)}
            onValueChange={handleValueChange}
          />
        )}
        <AppText>Particulars</AppText>
        <MonthPicker onMonthSelect={handleMonthSelect} />
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
