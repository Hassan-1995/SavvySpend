import React, { useEffect, useState } from "react";
import categoriesApi from "../api/categories";

import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../components/AppText";
import TableCol3 from "../components/TableCol3";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

function TestingScreen(props) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await categoriesApi.getAllContentFromCategories();
    setCategories(response.data);
    // console.log(category);
  };

  const getSingleData = async () => {
    const res = await categoriesApi.getSingleContentFromCategories(15);
    setCategory(res.data);
    console.log("getSingleData : ", category);
  };
  const addSingleData = async () => {
    const data = {
      id: 2,
      name: "Salary",
      description: "Monthly salary from company",
      type: "hello",
    };
    const res = await categoriesApi.addNewRowInCategories(data);
    setCategory(res.data);
    console.log("addSingleData : ", category);
  };
  const updateSingleData = async () => {
    const data = {
      id: 2,
      name: "Salary",
      description: "Monthly salary from company",
      type: "Income",
    };
    const res = await categoriesApi.updateSingleRowInCategories(24, data);
    setCategory(res.data);
    console.log("addSingleData : ", category);
  };
  const deleteSingleData = async () => {
    const res = await categoriesApi.deleteSingleContentFromCategories(27);
    setCategory(res.data);
    console.log("getSingleData : ", category);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <AppButton title={"Get Single Category"} onPress={getSingleData} />
          <AppButton title={"Add Single Category"} onPress={addSingleData} />
          <AppButton
            title={"Update Single Category"}
            onPress={updateSingleData}
          />
          <AppButton
            title={"Delete Single Category"}
            onPress={deleteSingleData}
          />
          <ScrollView>
            <TableCol3 assets={categories} />
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default TestingScreen;
