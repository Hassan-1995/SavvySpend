import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import usersApi from "../api/users";
import { jwtDecode } from "jwt-decode";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import LogoContainer from "../components/LogoContainer";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  user_email: Yup.string().required().email().label("Email"),
  user_password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState([]);
  const [loginID, setLoginID] = useState(true);

  const handleSubmit = async (values) => {
    try {
      const { user, token } = await usersApi.authenticateUser(
        values.user_email,
        values.user_password
      );

      if (!user || !token) {
        setLoginID(false);
        return;
      }

      setLoginID(true);

      const auth = jwtDecode(token);
      authContext.setUser(user);
      authStorage.storeToken(token);
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      setLoginID(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <LogoContainer />
      {loginID ? <Text></Text> : <Text>User ID or Password is incorrect</Text>}
      <AppForm
        initialValues={{ user_email: "", user_password: "" }}
        onSubmit={(values) => handleSubmit(values)}
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
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon={"lock"}
          name={"user_password"}
          placeholder="Password"
          secureTextEntry={true}
          textContentType="emailAddress"
        />
        <SubmitButton title={"Login"} />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
