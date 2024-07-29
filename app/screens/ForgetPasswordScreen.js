import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import usersApi from "../api/users";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import LogoContainer from "../components/LogoContainer";

function ForgetPasswordScreen({ navigation }) {
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
        Alert.alert("Error", "The email does not match our records.");
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
    try {
      const response = await usersApi.updateUser(user.user_id, data);
      if (response) {
        Alert.alert("Success", "Password has been reset.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Failed to reset password.");
      }
    } catch (error) {
      console.log("Error resetting password:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <LogoContainer />
        <AppText style={styles.label}>Forget Password</AppText>
        {step === 1 ? (
          <>
            <AppTextInput
              placeholder="Email"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppButton title="Next" onPress={handleVerification} />
          </>
        ) : (
          <>
            <AppTextInput
              placeholder="New Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppTextInput
              placeholder="Confirm New Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppButton title="Reset Password" onPress={handlePasswordReset} />
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

export default ForgetPasswordScreen;
