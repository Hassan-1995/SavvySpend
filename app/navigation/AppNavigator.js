import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IncomeScreen from "../screens/IncomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import BudgetScreen from "../screens/BudgetScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Income"
      component={IncomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="arrow-down-bold-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Expense"
      component={ExpenseScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="arrow-up-bold-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Budget"
      component={BudgetScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="clipboard-text"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="chart-areaspline"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
