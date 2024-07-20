import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import defaultStyles from "../config/styles";

const months = [
  { label: "All", value: "null" },
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

function MonthPicker({ onMonthSelect }) {
  const [selectedValue, setSelectedValue] = useState(months[0].label);

  const handleValueChange = (month) => {
    setSelectedValue(month);
    onMonthSelect(month);
  };

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={handleValueChange}
      >
        {months.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
            style={{ fontSize: 18 }}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    marginVertical: 10,
  },
  picker: {
    padding: 15,
    width: "100%",
  },
});

export default MonthPicker;
