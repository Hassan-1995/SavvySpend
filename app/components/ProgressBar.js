import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function ProgressBar({ asset1, asset2 }) {
  const percentage = useMemo(() => {
    if (asset2 === 0) return 0;
    const value = (asset1 / asset2) * 100;
    return Math.min(Math.max(value, 0), 100);
  }, [asset1, asset2]);

  return (
    <View
      style={styles.goalInformationBar}
      accessibilityLabel={`Progress: ${percentage}%`}
    >
      <View style={[styles.overlay, { width: `${percentage}%` }]} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{percentage.toFixed(1)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalInformationBar: {
    marginVertical: 10,
    alignSelf: "center",
    width: "100%",
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: "dashed",
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 15,
    margin: 2,
    backgroundColor: colors.danger,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
  },
});

export default ProgressBar;
