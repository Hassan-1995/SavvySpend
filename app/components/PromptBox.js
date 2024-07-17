import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import Icon from "./Icon";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppTextInput from "./AppTextInput";
import DropdownComponent from "./DropdownComponent";

function PromptBox({ onClick, label, dropdownOptions }) {
  const [inputValue, setInputValue] = useState(
    label.amount !== undefined ? label.amount : ""
  );
  const [utilityDescription, setUtilityDescription] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    dropdownOptions[0].value
  );
  const [selectedDropdownLabel, setSelectedDropdownLabel] = useState(
    dropdownOptions[0].label
  );

  useEffect(() => {
    if (!inputValue) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }, [inputValue]);

  const handleBlur = () => {
    if (!inputValue) {
      setIsInputEmpty(true);
    }
  };

  const handleEdit = () => {
    if (!isInputEmpty) {
      const data = {
        // utilityAmount: inputValue,
        // utilityName: selectedDropdownLabel,
        // utilityDescription: utilityDescription || "", // If utilityDescription is empty, set it to an empty string
        utility_name: selectedDropdownLabel,
        amount: inputValue,
        description: utilityDescription || "", // If utilityDescription is empty, set it to an empty string
        // utility_name: "Water",
        // amount: 123,
        // description: "hello world" || "", // If utilityDescription is empty, set it to an empty string
      };
      onClick(data); // Pass the data object to the parent
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <View style={styles.titleContainer}>
          {label === "Add new utility." ? (
            <AppText style={styles.title}>{label}</AppText>
          ) : (
            <AppText style={styles.title}>{label.utility_name}</AppText>
          )}
          <TouchableOpacity onPress={handleEdit}>
            <Icon
              name={"close"}
              size={30}
              backgroundColor="transparent"
              iconColor={colors.danger}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("View Expenses Sources")}>
          <AppText style={styles.text}>Add another source of label.</AppText>
        </TouchableOpacity>
        <View>
          {label === "Add new utility." ? (
            <DropdownComponent
              dropdownOptions={dropdownOptions}
              initialValue={dropdownOptions[0].value} // Pass initial value
              onValueChange={(value, label) => {
                setSelectedDropdownValue(value);
                setSelectedDropdownLabel(label);
              }} // Set the selected value and label in the state
            />
          ) : (
            <></>
          )}
          <View>
            <AppTextInput
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder={"Please add expected budget."}
              onBlur={handleBlur}
            />
          </View>
          <View>
            <AppTextInput
              value={utilityDescription}
              onChangeText={(text) => setUtilityDescription(text)}
              placeholder={"Please add a description (optional)."}
            />
          </View>
        </View>
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
    backgroundColor: "rgba(16, 75, 125, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  promptContainer: {
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
  subTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: colors.link,
    textAlign: "right",
    fontStyle: "italic",
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
  },
  label: {
    padding: 15,
    width: "100%",
  },
  error: {
    marginTop: 5,
    fontSize: 14,
    color: colors.danger,
    fontStyle: "italic",
  },
});

export default PromptBox;
