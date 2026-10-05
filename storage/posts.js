import AsyncStorage from "@react-native-async-storage/async-storage";

// Forum posts are kept on the device. The Pantry basket the app used before
// has been deleted, so there is no shared backend for them any more.
const POSTS_KEY = "forum.posts";

export const getPosts = async () => {
  const stored = await AsyncStorage.getItem(POSTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addPost = async (post) => {
  const posts = [post, ...(await getPosts())];
  await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return posts;
};
