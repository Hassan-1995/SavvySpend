import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { jwtDecode } from "jwt-decode";

import myTheme from "./app/navigation/navigationTheme";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import TestingScreen from "./app/screens/TestingScreen";
import ForgetPasswordScreen from "./app/screens/ForgetPasswordScreen";
import TestingComponent from "./app/components/TestingComponent";
import AccountProfileScreen from "./app/screens/AccountProfileScreen";

export default function App() {
  const [user, setUser] = useState();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    // <ForgetPasswordScreen/>
    // <WelcomeScreen/>
    // <TestingComponent />
    // <TestingScreen />
    // <AccountProfileScreen />
    // ----------------------------------------------

    // <NavigationContainer theme={myTheme}>
    //   <AuthNavigator />
    // </NavigationContainer>

    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={myTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>

    // <NavigationContainer theme={myTheme}>
    //   <AppNavigator />
    // </NavigationContainer>
  );
}
