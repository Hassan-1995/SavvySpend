import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import categoriesApi from "../api/categories";

import Screen from "../components/Screen";
import LogoContainer from "../components/LogoContainer";
import colors from "../config/colors";
import AppText from "../components/AppText";
import TableCol3 from "../components/TableCol3";
import CategoryTable from "../components/CategoryTable";

function CategoryScreen(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const response = await categoriesApi.getAllContentFromCategories(1);
    setCategories(response.data);
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Categories</AppText>
      </View>
      <ScrollView>
        <CategoryTable assets={categories}/>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default CategoryScreen;
