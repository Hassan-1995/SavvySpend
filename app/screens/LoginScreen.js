import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import usersApi from "../api/users";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  AppFormPassword,
  SubmitButton,
} from "../components/forms";
import LogoContainer from "../components/LogoContainer";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import colors from "../config/colors";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  user_email: Yup.string().required().email().label("Email"),
  user_password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginID, setLoginID] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { user, token } = await usersApi.authenticateUser(
        values.user_email,
        values.user_password
      );

      if (!user || !token) {
        setLoginID(false);
        setLoading(false);
        return;
      }

      setLoginID(true);

      const auth = jwtDecode(token);
      authContext.setUser(user);
      authStorage.storeToken(token);
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      setLoginID(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <LogoContainer />
      {loginID ? null : (
        <Text style={styles.errorText}>
          User Email or Password is incorrect
        </Text>
      )}
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      <AppForm
        initialValues={{ user_email: "", user_password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon={"email"}
          keyboardType="email-address"
          name={"user_email"}
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormPassword
          autoCapitalize="none"
          autoCorrect={false}
          icon={"lock-outline"}
          name={"user_password"}
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("Forget Password")}
        >
          <AppText style={styles.links}>Forget password?</AppText>
        </TouchableOpacity>
        <SubmitButton title={"Login"} />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  links: {
    fontStyle: "italic",
    fontSize: 14,
    color: colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
});

export default LoginScreen;
