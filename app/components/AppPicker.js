import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";
import AppButton from "./AppButton";

function AppPicker({ dropdownOptions, onValueChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [particular, setParticular] = useState(dropdownOptions[0].name);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleValueChange = (itemID, itemName) => {
    console.log(itemID);
    handleModal();
    setParticular(itemName);

    onValueChange(itemID, itemName);
  };

  useEffect(() => {
    const initialItem = dropdownOptions[0];
    onValueChange(initialItem.category_id, initialItem.name);
  }, []);

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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* <AppButton title={"Close"} onPress={handleModal} /> */}
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
              data={dropdownOptions}
              keyExtractor={(item) => item.category_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => handleValueChange(item.category_id, item.name)}
                >
                  <Icon
                    name={item.icon_name}
                    size={30}
                    iconColor={colors.white}
                    backgroundColor={colors.secondary}
                  />
                  <AppText style={styles.itemText}>{item.name}</AppText>
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
    marginLeft: 20,
    fontSize: 20,
    color: colors.primary,
  },
});

export default AppPicker;
