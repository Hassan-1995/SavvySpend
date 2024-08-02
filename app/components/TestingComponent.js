import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

function TestingComponent(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,255,0,0.5)", "transparent"]}
        style={styles.banner}
      >
        {/* You can add content to the banner here if needed */}
      </LinearGradient>
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <AppText style={styles.textItem}>Hello</AppText>
          <AppText style={styles.textItem}>Hello</AppText>
          <AppText style={styles.textItem}>Hello</AppText>
          <AppText style={styles.textItem}>Hello</AppText>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <AppTextInput />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: "30%",
    backgroundColor: "blue",
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "pink",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    marginTop: -25, // Creates the overlapping effect with the banner
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  textItem: {
    height: 100,
    backgroundColor: "white",
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    paddingVertical: 10,
  },
});

export default TestingComponent;
