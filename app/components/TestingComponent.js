import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

function TestingComponent(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Icon name={"home-outline"} backgroundColor={colors.primary} />
            <View style={styles.textContainer}>
              <AppText style={styles.title}>Title</AppText>
              <AppText style={styles.subtitle}>Subtitle</AppText>
            </View>
          </View>
          <TouchableOpacity>
            <Icon
              name={"chevron-right"}
              backgroundColor={colors.secondary}
              iconColor={colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.subHeader}>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Spent</AppText>
            <AppText style={styles.summaryValue}>Rs 1,000</AppText>
          </View>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Left to spend</AppText>
            <AppText style={styles.summaryValue}>Rs 2,000</AppText>
          </View>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Limit</AppText>
            <AppText style={[styles.summaryValue, { color: colors.safe }]}>
              Rs 1,000
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.dark,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.medium,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default TestingComponent;
