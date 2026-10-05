import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigation from "./StackNavigation";
import StackNavigationB from "./AnimalStack";
import CharityStack from "./CharityStack";
import ForumStack from "./ForumStack";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Tabs = createBottomTabNavigator();
const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Animals") {
            iconName = focused ? "paw" : "paw";
          } else if (route.name === "Charity") {
            iconName = focused ? "donate" : "donate";
          } else if (route.name === "Forum") {
            iconName = focused ? "comment-dots" : "comment-dots";
          }
          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F1420B",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingVertical: 10,
        },
      })}
    >
      <Tabs.Screen name="Home" component={StackNavigation} />
      <Tabs.Screen name="Animals" component={StackNavigationB} />
      <Tabs.Screen name="Charity" component={CharityStack} />
      <Tabs.Screen name="Forum" component={ForumStack} />
    </Tabs.Navigator>
  );
};
export default TabsNavigator;
