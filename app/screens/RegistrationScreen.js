import React from "react";
import * as Yup from "yup";

import usersApi from "../api/users";

import { StyleSheet, Image, ScrollView } from "react-native";

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
  password: Yup.string().required().min(4).label("Password"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.string().required().label("Number"),
  dob: Yup.string().required().label("Date of Birth"),
});

function RegisterationScreen(props) {
  const Register = async (data) => {
    console.log(data);
    try {
      const response = await usersApi.addNewUser(data);
      console.log("User added successfully", response);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <Screen>
      <LogoContainer/>
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
          onSubmit={(values) => Register(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-circle-outline"
            keyboardType="email-address"
            name="firstName"
            placeholder="First Name"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-box-outline"
            keyboardType="email-address"
            name="lastName"
            placeholder="Last Name"
            textContentType="emailAddress"
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
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone-outline"
            keyboardType="numeric"
            name="number"
            placeholder="Number"
            textContentType="emailAddress"
          />
          <AppFormDate name="dob" placeholder={"Date of Birth"} />

          <SubmitButton title="Register" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
  },
});

export default RegisterationScreen;
