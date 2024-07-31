import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function TestingComponent({
  name = "plus",
  size = 40,
  iconColor = "#fff",
  title,
  onPress,
  color = "primary",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.7} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    // width: '100%',
    flexDirection: "row",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 5,
    // textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default TestingComponent;
