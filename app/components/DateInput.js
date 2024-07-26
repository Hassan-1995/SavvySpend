import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import defaultStyles from "../config/styles";

function DateInput({
  width = "100%",
  onPress,
  title = "date",
  icon = "calendar-month-outline",
  onDateChange,
  placeholder = "Select date",
  ...otherProps
}) {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    if (!date) return placeholder;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={showDatepicker}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, !date && styles.placeholder]}>
        {date ? formatDate(date) : placeholder}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    color: defaultStyles.colors.dark,
    fontSize: 18,
    textTransform: "uppercase",
  },
  placeholder: {
    color: defaultStyles.colors.medium,
  },
  icon: {
    marginRight: 10,
  },
});

export default DateInput;
