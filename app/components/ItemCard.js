import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function ItemCard({ name, onClick }) {
  const handleAdd = (value) => {
    onClick("Add "+value);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleAdd(name)}
      //   onPress={onClick()}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.subContainer}
      >
        <Image
          source={require("../assets/favicon.png")}
          style={styles.vectorImage}
        />
      </LinearGradient>

      <AppText style={{ textAlign: "center", fontSize: 12 }}>{name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 140,
    marginHorizontal: 5,
    // backgroundColor: 'red',
  },
  subContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  vectorImage: {
    width: 80,
    height: 80,
  },
});

export default ItemCard;
