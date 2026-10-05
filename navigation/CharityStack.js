import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//screens

import CharityScreen from "../Screens/CharityScreen";
import CharityDetailScreen from "../Screens/CharityDetailScreen";

const CharityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CharityScreen" component={CharityScreen} />
      <Stack.Screen
        name="CharityDetailsScreen"
        component={CharityDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default CharityStack;
