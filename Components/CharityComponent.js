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
import Icon from "@expo/vector-icons/AntDesign";

const CharityComponent = ({ navigation }) => {
  const [filterData, setfilterData] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  //Get Data from Api
  const getData = async () => {
    try {
      const resp = await fetch(
        "https://api.jsonbin.io/v3/b/62711f1d25069545a32cc065/latest"
      );
      const { record: data } = await resp.json();
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
        const itemData = item.charityname
          ? item.charityname.toUpperCase()
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
  //render Item view
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("CharityDetailsScreen", item)}
        style={[styles.item, styles.shadowProp]}
      >
        <View style={styles.itemcontainer}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 100,
              height: "100%",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              resizeMode: "contain",
            }}
          ></Image>
          <Text style={[styles.title]}>{item.charityname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={16} color="black" />
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
    justifyContent: "center",
    marginLeft: 15,
    flexDirection: "row",
    textAlign: "left",
    fontSize: 15,
    height: 100,
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
  title: {
    alignSelf: "center",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    fontWeight: "700",
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
export default memo(CharityComponent);
