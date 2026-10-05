import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//screens

import AnimalScreen from "../Screens/AnimalScreen";
import DetailScreen from "../Screens/DetailScreen";

const StackNavigationB = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AnimalScreen" component={AnimalScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigationB;
