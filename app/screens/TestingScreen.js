import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import usersApi from "../api/users";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

function TestingScreen(props) {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleVerification = async () => {
    try {
      const response = await usersApi.getSingleUserByEmail(emailOrPhone);
      setUser(response);
      if (response) {
        setStep(2);
      } else {
        Alert.alert(
          "Error",
          "The email or phone number does not match our records."
        );
      }
    } catch (error) {
      console.log("Error verifying email or phone:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    const data = {
      ...user,
      password_hash: password,
    };
    console.log("Data: ", data);
    console.log("User ID: ", user.user_id);
    try {
      const response = await usersApi.updateUser(user.user_id, data);
      if (response) {
        Alert.alert("Success", "Password has been reset.");
        // props.navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Failed to reset password.");
      }
    } catch (error) {
      console.log("Error resetting password:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleEmail = (value) => {
    setEmailOrPhone(value);
    // console.log(emailOrPhone);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.label}>Forget Password</AppText>
        {step === 1 ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button title="Next" onPress={handleVerification} />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button title="Reset Password" onPress={handlePasswordReset} />
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.light,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.medium,
    padding: 10,
    marginBottom: 15,
  },
});

export default TestingScreen;
