import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

function ExpenseTable({ expenses, onPressingEachRow }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <ScrollView>
      {expenses.map((item) => (
        <View style={styles.card} key={item.expense_id}>
          <View style={styles.header}>
            <AppText style={styles.title}>{item.name}</AppText>
            <AppText style={styles.amount}>{`Rs ${parseInt(
              item.amount
            ).toLocaleString()}`}</AppText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <AppText style={styles.date}>
                {formatDate(item.updated_at)}
              </AppText>
              <AppText style={styles.description}>{item.description}</AppText>
            </View>
            <TouchableOpacity onPress={() => onPressingEachRow(item)}>
              <Icon
                name={"circle-edit-outline"}
                iconColor={colors.primary}
                backgroundColor="transparent"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.expense,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    // width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc3545", // Red color for expense
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});

export default ExpenseTable;
