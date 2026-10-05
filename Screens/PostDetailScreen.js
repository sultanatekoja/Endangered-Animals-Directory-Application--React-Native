import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import Icon from "react-native-vector-icons/Ionicons";

const PostDetailScreen = ({ navigation, route }) => {
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
      <ScrollView style={styles.textcontainer}>
        <View>
          <Text style={styles.textheader}>{item.title}</Text>
          <Text style={styles.texttime}>{item.created}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
        <View>
          <Text style={styles.textbody}>{item.detail}</Text>
        </View>
      </ScrollView>
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
    padding: 10,
  },
  textcontainer: {
    padding: 20,
    flex: 0.5,
  },
  textheader: {
    fontSize: 30,
    fontWeight: "600",
  },
  texttime: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  author: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
    fontWeight: "400",
    color: "#F1420B",
  },
  textbody: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 30,
  },
});

export default PostDetailScreen;
