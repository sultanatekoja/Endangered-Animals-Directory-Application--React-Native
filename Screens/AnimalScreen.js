import "react-native-gesture-handler";
import React from "react";
import AnimalComponent from "../Components/AnimalComponent";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimalScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}
            >
              All Animals
            </Text>
          </View>
        </View>
        <AnimalComponent navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AnimalScreen;
