import "react-native-gesture-handler";
import React, { useState, useEffect, memo } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PostComponent = ({ navigation }) => {
  //Get Data from Api

  //const getData = async () => {
  //  const resp = await fetch(
  //   "https://getpantry.cloud/apiv1/pantry/3c736377-114e-4b1c-9971-ac728ee587c4/basket/blog"
  // )
  //   .then((response) => response.json())
  //    .catch((err) => {
  //    console.error(err);
  //    });
  // console.log(resp);
  // };

  const [data, setData] = useState(null);
  const getData = async () => {
    const resp = await fetch(
      "https://getpantry.cloud/apiv1/pantry/3c736377-114e-4b1c-9971-ac728ee587c4/basket/blog"
    )
      .then((response) => response.json())
      .catch((err) => {
        console.error(err);
      });
    const newData = resp.currentPostsList;
    setData(newData);
    console.log(data);
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
        onPress={() => navigation.navigate("PostDetailScreen", item)}
        style={[styles.item, styles.shadowProp]}
      >
        <View style={styles.container}>
          <Text style={[styles.time]}>{item.created}</Text>
          <Text style={[styles.title]}>{item.title}</Text>
          <Text style={[styles.author]}>{item.author}</Text>
          <Text numberOfLines={3} style={[styles.detail]}>
            {item.detail}
          </Text>
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
      style={{
        paddingTop: 10,
        backgroundColor: "#FAFAFA",
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    height: 200,
  },
  item: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
    flexWrap: "wrap",
  },
  detail: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    fontWeight: "200",
    marginTop: 2,
  },
  time: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    fontWeight: "300",
    marginTop: 20,
  },
  author: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    marginVertical: 10,
    fontWeight: "400",
    color: "#F1420B",
  },
  shadowProp: {
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
});
export default memo(PostComponent);
