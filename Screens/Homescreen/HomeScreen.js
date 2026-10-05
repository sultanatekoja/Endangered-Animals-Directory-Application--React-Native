import "react-native-gesture-handler";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState, useEffect } from "react";
import CharityComponent from "../../Components/CharityComponentShort";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Pressable,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const resp = await fetch(
        "https://api.jsonbin.io/b/625dfd5ebc312b30ebe90a13"
      );
      const data = await resp.json();
      setData(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let abortController = new AbortController();
    getData();
    return () => {
      abortController.abort();
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", item)}
      >
        <View style={[styles.item, styles.shadowProp]}>
          <Image
            source={{ uri: item.images }}
            style={{
              width: 300,
              height: 170,
              borderRadius: 10,
            }}
          ></Image>
          <Text style={[styles.title]}>{item.animalname}</Text>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <FontAwesome5
              name="location-arrow"
              size={12}
              color="#a3a3a3"
              style={{
                marginTop: 5,
                marginLeft: 10,
              }}
            />
            <Text style={[styles.location]}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Welcome to the
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              WWF {"\n"}Endangered Animal Directory
            </Text>
          </View>
        </View>
        <View style={styles.animalcontainer}>
          <View style={styles.sectionHeader}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Featured Animals
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FF0000",
                  borderBottomWidth: 1,
                  borderColor: "#868585",
                }}
                onPress={() => navigation.navigate("AnimalScreen")}
              >
                View All
              </Text>
            </Pressable>
          </View>
          <FlatList
            contentContainerStyle={{ alignSelf: "flex-start" }}
            ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.charityList}>
          <View style={styles.charityHeader}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Featured Charities
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FF0000",
                  borderBottomWidth: 1,
                  borderColor: "#868585",
                }}
                onPress={() => navigation.navigate("CharityScreen")}
              >
                View All
              </Text>
            </Pressable>
          </View>
          <CharityComponent navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  animalcontainer: {},
  charityList: {},
  sectionHeader: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  charityHeader: {
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    marginHorizontal: 10,
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: "#E6E6E6",
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 90,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    height: 230,
    width: 300,
    marginVertical: 18,
    marginLeft: 10,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  title: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  location: {
    marginTop: 2,
    marginLeft: 5,
    color: "#a3a3a3",
  },
  description: {
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  shadowProp: {
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
});

export default HomeScreen;
