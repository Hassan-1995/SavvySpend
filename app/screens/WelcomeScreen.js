import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import LogoContainer from "../components/LogoContainer";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LogoContainer />
      <AppText style={styles.title}>Welcome to Our App</AppText>
      <View style={styles.buttonContainer}>
        <AppButton
          title={"Login"}
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          title={"Register"}
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#4CAF50", // Green color for login button
  },
  registerButton: {
    backgroundColor: "#ff5252", // Red color for register button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
