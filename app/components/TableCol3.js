import React from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";

function TableCol3({ assets }) {
  // console.log(assets[0]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.headerCell}>Name</AppText>
        <AppText style={styles.headerCell}>Description</AppText>
        <AppText style={styles.headerCell}>Type</AppText>
      </View>
      {assets.map((item) => (
        <View key={item.category_id} style={styles.row}>
          <AppText style={styles.cell}>{item.name}</AppText>
          <AppText style={styles.cell}>{item.description}</AppText>
          <AppText style={styles.cell}>{item.updated_at}</AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
});

export default TableCol3;
