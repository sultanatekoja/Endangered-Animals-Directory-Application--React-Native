import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

const CharityComponent = ({ navigation }) => {
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const resp = await fetch(
        "https://api.jsonbin.io/v3/b/62711f1d25069545a32cc065/latest"
      );
      const { record: data } = await resp.json();
      setData(data.slice(0, 4));
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
        onPress={() => navigation.navigate("CharityDetailsScreen", item)}
        style={[styles.item, styles.shadowProp]}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 100,
              height: "100%",
              resizeMode: "contain",
            }}
          ></Image>
          <Text style={[styles.title]}>{item.charityname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={2}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginLeft: 15,
    flexDirection: "row",
    textAlign: "left",
    fontSize: 15,
    height: 100,
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
  shadowProp: {
    shadowColor: "#1a1a1a",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});
export default CharityComponent;
