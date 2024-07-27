import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IncomeScreen from "../screens/IncomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import BudgetScreen from "../screens/BudgetScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  // <NavigationContainer>
  //   <Stack.Navigator>
  //     {userToken ? (
  //       <>
  //         <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
  //         <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} />
  //         <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
  //       </>
  //     ) : (
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //     )}
  //   </Stack.Navigator>
  // </NavigationContainer>

  // <Stack.Navigator>
  //   <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
  //   <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} />
  //   <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
  // </Stack.Navigator>

  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
    headerShown: false
  }} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
