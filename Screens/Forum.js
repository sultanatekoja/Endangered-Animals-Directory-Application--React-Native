import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import PostComponent from "../Components/PostComponent";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/AntDesign";

const Forum = ({ navigation }) => {
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
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}
          >
            All Posts
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewPostScreen")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="plus-circle"
              size={22}
              color="#a3a3a3"
              style={{
                marginRight: 10,
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "300" }}>Add Posts</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PostComponent navigation={navigation} />
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
});
export default Forum;
