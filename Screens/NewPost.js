import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const NewPost = ({ navigation, route, submitHandler }) => {
  const [title, setTitle] = useState({});
  const [author, setAuthor] = useState({});
  const [detail, setDetail] = useState({});
  const [currentPostsList, setCurrentPostsList] = useState([]);
  let id = uuidv4();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let fullDate = `${day}.${month}.${year}.`;

  const onSubmit = async () => {
    let newObj = {
      id: id,
      title: title,
      author: author,
      detail: detail,
      created: fullDate,
    };
    console.log(newObj);
    setCurrentPostsList((currentPostsList) => {
      return [newObj].concat(currentPostsList);
    });
    alert("Blog Posted");
    await postBlog();
  };

  const postBlog = async () => {
    const postObj = {
      currentPostsList,
    };

    const { error } = await fetch(
      "https://getpantry.cloud/apiv1/pantry/3c736377-114e-4b1c-9971-ac728ee587c4/basket/blog/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObj),
      }
    );
    if (error) {
      console.log(error);
    }
    console.log("Posted!");
  };

  const getPosts = async () => {
    const res = await fetch(
      "https://getpantry.cloud/apiv1/pantry/3c736377-114e-4b1c-9971-ac728ee587c4/basket/blog/"
    )
      .then((response) => response.json())
      .catch((err) => {
        console.error(err);
      });

    return res;
  };

  useEffect(() => {
    let abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);
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
