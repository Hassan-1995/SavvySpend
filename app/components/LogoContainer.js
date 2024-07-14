import React from "react";

import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function LogoContainer(props) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: width * 0.8, height: height * 0.1 }}
        source={require("../assets/Logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 30,
  },
});

export default LogoContainer;
