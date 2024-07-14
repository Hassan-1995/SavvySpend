import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

const options = [
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "js" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
];

function DropdownComponent({ dropdownOptions }) {
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>Select source of {}:</AppText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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
