import React from "react";
import * as Yup from "yup";
import usersApi from "../api/users";

import { StyleSheet, ScrollView } from "react-native";
import {
  AppForm,
  AppFormDate,
  AppFormField,
  AppFormPassword,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  password: Yup.string().required().min(5).label("Password"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.string().required().label("Number"),
  dob: Yup.string().required().label("Date of Birth"),
});

function RegistrationScreen(props) {
  const Register = async (data) => {
    console.log(data);
    try {
      const response = await usersApi.addNewUser(data);
      console.log("User added successfully", response);
      // Provide user feedback on successful registration
    } catch (error) {
      console.error("Error adding user", error);
      // Provide user feedback on error
    }
  };

  return (
    <Screen>
      <LogoContainer />
      <ScrollView style={styles.container}>
        <AppText style={styles.header}>Registration Form</AppText>
        <AppForm
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            number: "",
            dob: "",
          }}
          onSubmit={Register}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-circle-outline"
            name="firstName"
            placeholder="First Name"
            textContentType="name"
          />
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-box-outline"
            name="lastName"
            placeholder="Last Name"
            textContentType="name"
          />
          <AppFormPassword
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-outline"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email-outline"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone-outline"
            keyboardType="numeric"
            name="number"
            placeholder="Number"
            textContentType="telephoneNumber"
          />
          <AppFormDate name="dob" placeholder="Date of Birth" />
          <SubmitButton title="Register" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
});

export default RegistrationScreen;
