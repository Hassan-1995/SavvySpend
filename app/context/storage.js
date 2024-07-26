import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save token
const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Function to get token
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("userToken");
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// Function to remove token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export default {
  saveToken,
  getToken,
  removeToken,
};
