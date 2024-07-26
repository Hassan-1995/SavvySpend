import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import usersApi from "../api/users";

import {
  AppForm,
  AppFormField,
  AppFormDate,
  SubmitButton,
  AppFormCountry,
  AppFormContactNumber,
  AppFormAttachment,
} from "../components/forms";
import LogoContainer from "../components/LogoContainer";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  guardian: Yup.string().required().label("Guardian Name"),
  email: Yup.string().required().email().label("Email"),
  date: Yup.string().required().label("Date"),
  country: Yup.string().required().label("Country"),
  contact: Yup.object()
    .shape({
      dial_code: Yup.string().required("Dial code is required"),
      dial_number: Yup.string().required("Contact number is required"),
    })
    .required()
    .label("Contact"),
});

const handleSubmit = async (values) => {
  console.log(values);

  //   const data = {
  //     first_name: "Mirha",
  //     last_name: "Anas",
  //     password: "password123",
  //     email: "mirha@example.com",
  //     phone_number: null,
  //     date_of_birth: null,
  //     role: "user",
  //   };
  //   try {
  //     const response = await usersApi.addNewUser(data);
  //     console.log("User added successfully", response);
  //   } catch (error) {
  //     console.error("Error adding user", error);
  //   }
};

function RegisterScreen(props) {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LogoContainer />
        <AppForm
          initialValues={{
            name: "",
            guardian: "",
            email: "",
            date: "",
            country: "",
            contact: {
              dial_code: "",
              dial_number: "",
            },
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalise="none"
            autoCorrect={false}
            icon={"account"}
            name={"name"}
            placeholder="Name"
          />
          <AppFormField
            autoCapitalise="none"
            autoCorrect={false}
            icon={"shield-account-outline"}
            name={"guardian"}
            placeholder="Father's or Hsusband's name"
          />
          <AppFormDate name={"date"} />
          {/* <AppFormCountry name={"country"} /> */}
          <AppFormField
            autoCapitalise="none"
            autoCorrect={false}
            icon={"email"}
            keyboardType="email-address"
            name={"email"}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormContactNumber name={"contact"} />
          <View style={styles.buttonContainer}>
            <SubmitButton title={"Save and Continue"} />
          </View>
        </AppForm>
      </ScrollView>
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

export default RegisterScreen;
