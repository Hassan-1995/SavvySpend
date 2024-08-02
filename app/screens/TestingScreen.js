import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import TestingComponent from "../components/TestingComponent";

function TestingScreen(props) {
  return (
    <Screen>
      {/* Use LinearGradient for the background */}
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.tertiary]}
        style={styles.container}
      >
        <AppText style={styles.screenName}>Budget</AppText>
        <AppText style={styles.remainingAmount}>Rs 1,192 left</AppText>
        <AppText style={styles.enteredAmount}>out of Rs 2,640 budgeted</AppText>
        <TestingComponent
          title={"Create New Budget"}
          color="secondary"
          onPress={() => console.log("Press")}
        />
      </LinearGradient>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
          <View style={styles.box}>
            <AppText>TEMP</AppText>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  screenName: {
    fontSize: 20,
    color: colors.white,
  },
  remainingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 50,
  },
  enteredAmount: {
    fontSize: 16,
    color: colors.white,
    marginTop: 16,
  },
  box: {
    height: 50,
    width: "100%",
    backgroundColor: "pink",
    marginVertical: 3,
  },
  content: {
    height: "65%",
    alignSelf: "center",
    backgroundColor: "yellow",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default TestingScreen;
