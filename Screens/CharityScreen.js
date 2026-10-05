import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import CharityComponent from "../Components/CharityComponent";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const CharityScreen = ({ navigation }) => {
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
              All Charities
            </Text>
          </View>
        </View>
        <CharityComponent navigation={navigation} />
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
  item: {
    height: 120,
    marginVertical: 18,
    flex: 1,
  },
  title: {
    alignSelf: "center",
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default CharityScreen;
