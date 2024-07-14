import React, { useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import PromptBox from "../components/PromptBox";

const incomeOptions = [
  { label: "Salary", value: "salary" },
  { label: "Freelancing", value: "freelancing" },
  { label: "Investments", value: "investments" },
  { label: "Rental Income", value: "rental" },
  { label: "Business", value: "business" },
  { label: "Dividends", value: "dividends" },
  { label: "Interest", value: "interest" },
  { label: "Royalties", value: "royalties" },
  { label: "Pension", value: "pension" },
  { label: "Other", value: "other" },
];
const expenseOptions = [
  { label: "Rent", value: "rent" },
  { label: "Utilities", value: "utilities" },
  { label: "Groceries", value: "groceries" },
  { label: "Transportation", value: "transportation" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Insurance", value: "insurance" },
  { label: "Debt Payments", value: "debt" },
  { label: "Personal Care", value: "personalcare" },
  { label: "Miscellaneous", value: "miscellaneous" },
];

function CreateBudgetScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState("");
  const [options, setOptions] = useState([]);

  const handleModal = (buttonType) => {
    console.log(buttonType);
    if (buttonType === "Income") {
      setOptions(incomeOptions);
      // console.log(options);
    } else if (buttonType === "Expense") {
      setOptions(expenseOptions);
    }
    setButtonPressed(buttonType);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Create Budget</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <AppButton
            title={"Add Income"}
            onPress={() => handleModal("Income")}
            color="income"
          />
          <TouchableOpacity onPress={() => console.log("View Income Sources")}>
            <AppText style={styles.text}>
              View all sources of income added.
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <AppButton
            title={"Add Expense"}
            onPress={() => handleModal("Expense")}
            color="expense"
          />
          <TouchableOpacity
            onPress={() => console.log("View Expenses Sources")}
          >
            <AppText style={styles.text}>
              View all sources of expenses added.
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <PromptBox
          onClick={toggleModal}
          assets={buttonPressed}
          dropdownOptions={options}
        />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
  section: {
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: colors.link,
    textAlign: "right",
  },
});

export default CreateBudgetScreen;
