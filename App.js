import "react-native-gesture-handler";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigation/StackNavigation";
import Forum from "./Screens/Forum";
import NewPost from "./Screens/NewPost";
import TabsNavigator from "./navigation/TabsNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"></StatusBar>
      <TabsNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
