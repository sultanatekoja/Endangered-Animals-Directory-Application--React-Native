import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//screens
import HomeScreen from "../Screens/Homescreen/HomeScreen";
import AnimalScreen from "../Screens/AnimalScreen";
import DetailScreen from "../Screens/DetailScreen";
import CharityScreen from "../Screens/CharityScreen";
import CharityDetailScreen from "../Screens/CharityDetailScreen";
import Forum from "../Screens/Forum";
import NewPost from "../Screens/NewPost";

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AnimalScreen" component={AnimalScreen} />
      <Stack.Screen name="CharityScreen" component={CharityScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailScreen} />
      <Stack.Screen
        name="CharityDetailsScreen"
        component={CharityDetailScreen}
      />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
