import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";
import AppButton from "./AppButton";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

function MonthPicker({ onMonthSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [particular, setParticular] = useState("Pick a month");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleValueChange = (itemID, itemName) => {
    setSelectedValue(itemID);
    setParticular(itemName);

    console.log(itemID, itemName);
    handleModal();
    onMonthSelect(itemID);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <AppText>{particular}</AppText>
          <TouchableOpacity onPress={handleModal}>
            <Icon
              name={"chevron-down"}
              backgroundColor="transparent"
              iconColor={colors.medium}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <TouchableOpacity style={styles.modalOverlay} onPress={handleModal}>
          <View style={styles.modalContent}>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={handleModal}>
                <Icon
                  name={"close"}
                  size={30}
                  backgroundColor="transparent"
                  iconColor={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={months}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => handleValueChange(item.value, item.label)}
                >
                  <AppText style={styles.itemText}>{item.label}</AppText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.light,
    borderRadius: 25,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    elevation: 5,
    height: "80%",
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemText: {
    // marginLeft: 20,
    fontSize: 20,
    color: colors.primary,
  },
});

export default MonthPicker;
