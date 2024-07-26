import React, { useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import countries from "../assets/countries.json"; // IMPORTANT
import defaultStyles from "../config/styles";

import AppTextInput from "./AppTextInput";

function ContactNumberComponent({ onSelectCode = () => {} }) {
  const [selectedCode, setSelectedCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    handleContactNumber();
  }, [contactNumber, selectedCode]);

  const handleCountryCode = (itemValue) => {
    setSelectedCode(itemValue);
  };

  const handleContactNumber = () => {
    onSelectCode(selectedCode, contactNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dial_codeContainer}>
        <Picker selectedValue={selectedCode} onValueChange={handleCountryCode}>
          <Picker.Item
            label="Code"
            value=""
            key="placeholder"
            style={styles.picker}
          />
          {countries.map((country) => (
            <Picker.Item
              label={[
                country.dial_code + " " + country.emoji + " " + country.name,
              ]}
              value={country.code}
              key={country.code}
              style={styles.picker}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.phone_numberContainer}>
        <AppTextInput
          icon={"phone-outline"}
          onChangeText={(value) => setContactNumber(value)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    width: "100%",
    flexDirection: "row",
  },
  dial_codeContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    width: "40%",
    overflow: "hidden",
    marginVertical: 10,
  },
  phone_numberContainer: {
    width: "60%",
  },
  picker: {
    fontSize: 18,
    width: "100%",
  },
});

export default ContactNumberComponent;
