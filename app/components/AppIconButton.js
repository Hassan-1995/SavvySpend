import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppIconButton({
  title,
  onPress,
  color = "primary",
  iconName,
  size = 40,
  iconColor = "#fff",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          {
            width: size,
            height: size,
            // borderRadius: size / 2,
          },
        ]}
      >
        <Image
            style={{ width: size, height: size }}
            source={require("../assets/income.png")}
        />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppIconButton;
