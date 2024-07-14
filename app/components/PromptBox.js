import React from "react";

import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import Icon from "./Icon";
import colors from "../config/colors";

import AppTextInput from "./AppTextInput";
import DropdownComponent from "./DropdownComponent";

function PromptBox({ onClick, add, dropdownOptions }) {
  // console.log(assets);
  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Add {add}</AppText>
          <TouchableOpacity onPress={onClick}>
            <Icon
              name={"close"}
              size={30}
              backgroundColor="transparent"
              iconColor={colors.danger}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("View Expenses Sources")}>
          <AppText style={styles.text}>Add another source of {add}.</AppText>
        </TouchableOpacity>
        <View>
          <DropdownComponent dropdownOptions={dropdownOptions} />
          <View>
            <AppTextInput placeholder={"Please add expected budget."} />
          </View>
        </View>
        <AppButton
        title={'Confirm'}
        onPress={onClick} 
        />
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
    // height: "30%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    // alignItems: "center",
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 10,
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
    color: colors.secondary,
  },
});

export default PromptBox;
