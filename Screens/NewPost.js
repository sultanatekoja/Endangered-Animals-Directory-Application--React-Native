import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { addPost } from "../storage/posts";

const NewPost = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [detail, setDetail] = useState("");

  const onSubmit = async () => {
    if (!title.trim() || !detail.trim()) {
      Alert.alert("Missing details", "Please add a title and some details.");
      return;
    }
    const date = new Date();
    const newPost = {
      id: uuidv4(),
      title: title.trim(),
      author: author.trim() || "Anonymous",
      detail: detail.trim(),
      created: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`,
    };
    try {
      await addPost(newPost);
      Alert.alert("Blog Posted");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Could not save your post", "Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity>
            <Icon
              name="arrow-back-circle-outline"
              size={36}
              color="#000"
              style={{ marginTop: 15, flexDirection: "row" }}
              onPress={() => navigation.goBack(null)}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}
          >
            Create New Post
          </Text>
        </View>
      </View>

      <View style={styles.inputContainerA}>
        <TextInput
          placeholder="Title"
          onChangeText={(value) => setTitle(value)}
          placeholderTextColor="#868585"
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
      <View style={styles.inputContainerA}>
        <TextInput
          placeholder="Author"
          placeholderTextColor="#868585"
          onChangeText={(value) => setAuthor(value)}
          color="black"
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
      <View style={styles.inputContainerB}>
        <TextInput
          multiline
          placeholder="Details"
          placeholderTextColor="#868585"
          onChangeText={(value) => setDetail(value)}
          style={{
            marginTop: 10,
            fontSize: 15,
            fontWeight: "400",
            color: "#868585",
            flex: 1,
            justifyContent: "flex-start",
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ color: "#fff" }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainerA: {
    marginHorizontal: 10,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "#E6E6E6",
  },
  inputContainerB: {
    marginHorizontal: 10,
    borderWidth: 1,
    height: 170,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderColor: "#E6E6E6",
  },
  button: {
    marginHorizontal: 10,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1420B",
  },
});
export default NewPost;
