import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//screens

import Forum from "../Screens/Forum";
import NewPost from "../Screens/NewPost";
import PostDetailScreen from "../Screens/PostDetailScreen";

const ForumStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ForumScreen" component={Forum} />
      <Stack.Screen name="NewPostScreen" component={NewPost} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default ForumStack;
