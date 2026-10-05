import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import Icon from "@expo/vector-icons/Ionicons";

const DetailScreen = ({ navigation, route }) => {
  const item = route.params;
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="arrow-back-circle-outline"
            size={36}
            color="#000"
            style={{ marginTop: 15, flexDirection: "row" }}
            onPress={() => navigation.goBack(null)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imagecontainer}>
        <Image
          source={{ uri: item.images }}
          style={{
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        ></Image>
      </View>
      <View style={styles.textcontainer}>
        <View>
          <Text style={styles.textheader}>{item.animalname}</Text>
        </View>
        <View>
          <Text style={styles.textbody}>{item.details}</Text>
        </View>
        <View style={styles.textlocationbox}>
          <Text style={styles.textlocationhead}>LOCATION:</Text>
          <Text style={styles.textlocation}>{item.location}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagecontainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textcontainer: {
    padding: 20,
    flex: 0.5,
  },
  textheader: {
    fontSize: 20,
    fontWeight: "600",
  },
  textbody: {
    fontSize: 15,
    fontWeight: "200",
    marginTop: 10,
  },
  textlocationbox: {
    marginTop: 30,
  },
  textlocationhead: {
    fontSize: 12,
    fontWeight: "600",
  },
  textlocation: {
    fontSize: 20,
    fontWeight: "200",
    marginTop: 5,
  },
});

export default DetailScreen;
