import "react-native-gesture-handler";
import React, { useState, useCallback, memo } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import { getPosts } from "../storage/posts";

const PostComponent = ({ navigation }) => {
  const [data, setData] = useState([]);

  // Reload whenever the Forum tab comes back into view, so new posts show up.
  useFocusEffect(
    useCallback(() => {
      getPosts()
        .then(setData)
        .catch((err) => console.error(err));
    }, [])
  );

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
      ListEmptyComponent={
        <Text style={styles.empty}>No posts yet. Tap "Add Posts" to write one.</Text>
      }
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
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#a3a3a3",
  },
  shadowProp: {
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
});
export default memo(PostComponent);
