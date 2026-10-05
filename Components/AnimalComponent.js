import "react-native-gesture-handler";
import React, { useState, useEffect, memo } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AnimalComponent = ({ navigation }) => {
  const [filterData, setfilterData] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  //Get Data from Api
  const getData = async () => {
    try {
      const resp = await fetch(
        "https://api.jsonbin.io/b/625dfd5ebc312b30ebe90a13"
      );
      const data = await resp.json();
      setData(data);
      setfilterData(data);
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

  //Search
  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.animalname
          ? item.animalname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(data);
      setSearch(text);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", item)}
        style={[styles.item, styles.shadowProp]}
      >
        <View style={styles.itemcontainer}>
          <Image
            source={{ uri: item.images }}
            style={{
              width: 130,
              height: "100%",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
                  marginLeft: 20,
                }}
              />
              <Text style={[styles.location]}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search1" size={16} color="black" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#868585"
            value={search}
            onChangeText={(text) => searchFilter(text)}
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginVertical: 10,
              marginHorizontal: 10,
              color: "#868585",
              flex: 1,
            }}
          />
        </View>
      </View>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          paddingTop: 10,
          backgroundColor: "#FAFAFA",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemcontainer: {
    flexDirection: "row",
    textAlign: "left",
    height: 100,
  },
  searchContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderColor: "#E6E6E6",
  },
  item: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  location: {
    marginTop: 2,
    marginLeft: 5,
    color: "#a3a3a3",
  },
  title: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    fontWeight: "700",
    flexWrap: "wrap",
    fontWeight: "500",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  shadowProp: {
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 9, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
  },
});
export default memo(AnimalComponent);
