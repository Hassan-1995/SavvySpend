import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

function DropdownComponent({ dropdownOptions, onValueChange, initialValue }) {
  const [selectedValue, setSelectedValue] = useState(
    initialValue || dropdownOptions[0].value
  );
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    const initialOption = dropdownOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedLabel(
      initialOption ? initialOption.label : dropdownOptions[0].label
    );
  }, [selectedValue, dropdownOptions]);

  const handleValueChange = (itemValue) => {
    const selectedOption = dropdownOptions.find(
      (option) => option.value === itemValue
    );
    setSelectedValue(itemValue);
    setSelectedLabel(selectedOption.label);
    onValueChange(itemValue, selectedOption.label); // Notify the parent component of the change
  };

  return (
    <View style={styles.container}>
      {/* <AppText style={styles.label}>Select source of:</AppText> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={handleValueChange}
        >
          {dropdownOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              style={{ fontSize: 18 }}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
  },
  picker: {
    padding: 15,
    width: "100%",
  },
});

export default DropdownComponent;
