import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IncomeScreen from "../screens/IncomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import BudgetScreen from "../screens/BudgetScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
