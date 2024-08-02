import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import AppTextInput from "../components/AppTextInput";

function ExpenseEditDetailsScreen({ assets, closeModal, onEdit, onDelete }) {
  const [editAmount, setEditAmount] = useState(assets.amount);
  const [editDescription, setEditDescription] = useState(assets.description);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(assets.updated_at);

  const handleModal = () => {
    closeModal();
  };

  const handleUpdate = () => {
    const editData = {
      amount: editAmount,
      category_id: assets.category_id,
      date: assets.date,
      description: editDescription,
    };
    handleModal();
    onEdit(editData);
  };

  const handleDelete = () => {
    handleModal();
    onDelete(assets.expense_id);
  };

  return (
    <LinearGradient
      colors={["#8B0000", "#E74C3C", "#F1948A"]}
      style={styles.container}
    >
      <View style={styles.flexibleContent}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name={assets.icon_name}
              size={200}
              backgroundColor="transparent"
              iconColor={colors.white}
            />
            <AppText style={styles.header}>{assets.name}</AppText>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                marginBottom: 20,
              }}
            >
              <AppText style={styles.subHeader}>You've spent </AppText>
              <View
                style={{
                  backgroundColor: colors.danger,
                  padding: 4,
                  borderRadius: 25,
                }}
              >
                <AppText style={[styles.subHeader, styles.highlight]}>
                  {" "}
                  Rs {parseInt(assets.amount).toLocaleString()}{" "}
                </AppText>
              </View>
              <AppText style={styles.subHeader}> in August</AppText>
            </View>
          </View>

          <View style={styles.promptBox}>
            <View style={styles.titleContainer}>
              <AppText style={styles.title}>Edit {assets.name}</AppText>
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                onPress={handleModal}
              >
                <Icon
                  name={"close"}
                  size={40}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>

            <AppTextInput
              value={editAmount}
              onChangeText={(text) => setEditAmount(text)}
              keyboardType="numeric"
              placeholder={"Add utility amount."}
              style={styles.subTitle}
            />
            <AppTextInput
              value={editDescription}
              onChangeText={(text) => setEditDescription(text)}
              placeholder={"Add utility description."}
              multiline={true}
            />
            <AppText style={styles.date}>
              <AppText>Date: </AppText>
              {formattedDate}
            </AppText>
            <View style={styles.buttonContainer}>
              <AppText style={styles.links}>Delete this entry.</AppText>
              <TouchableOpacity onPress={handleDelete}>
                <Icon
                  name={"trash-can-outline"}
                  size={40}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.confirmButton}>
              <AppButton title={"Confirm"} onPress={handleUpdate} />
            </View>
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
  promptBox: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "#dc3545",
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: colors.white,
  },
  description: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: colors.medium,
    marginVertical: 10,
  },
  flexibleContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  confirmButton: {
    justifyContent: "flex-end",
  },
  links: {
    fontStyle: "italic",
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  highlight: {
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default ExpenseEditDetailsScreen;
