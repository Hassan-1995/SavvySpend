import React, { useContext, useEffect, useState } from "react";
import usersApi from "../api/users";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

function AccountProfileScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null); // Set initial state to null

  useEffect(() => {
    loadUserInformation();
  }, []);

  const handleLogout = () => {
    setUser(null);
    authStorage.removeToken();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  function formatNumberWithHyphen(number) {
    const numStr = number.toString();
    const firstPart = numStr.slice(0, -7);
    const lastPart = numStr.slice(-7);

    return `${firstPart}-${lastPart}`;
  }

  const loadUserInformation = async () => {
    try {
      const response = await usersApi.getSingleUserByUserID(user.user_id);
      setUserInfo(response);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.profileSection}>
        {/* <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.profilePicture}
        /> */}
        <AppText style={styles.username}>Username</AppText>
        <AppText style={styles.fullName}>
          {userInfo
            ? `${userInfo.first_name} ${userInfo.last_name}`
            : "Loading..."}
        </AppText>
      </View>

      <View style={styles.infoSection}>
        <AppText style={styles.infoTitle}>Email</AppText>
        <AppText style={styles.infoValue}>
          {userInfo ? userInfo.email : "Loading..."}
        </AppText>
      </View>

      <View style={styles.infoSection}>
        <AppText style={styles.infoTitle}>Phone Number</AppText>
        <AppText style={styles.infoValue}>
          {userInfo
            ? formatNumberWithHyphen(userInfo.phone_number)
            : "Loading..."}
        </AppText>
      </View>

      <View style={styles.infoSection}>
        <AppText style={styles.infoTitle}>Date of Birth</AppText>
        <AppText style={styles.infoValue}>
          {userInfo ? formatDate(userInfo.date_of_birth) : "Loading..."}
        </AppText>
      </View>

      <TouchableOpacity style={styles.button}>
        <AppText style={styles.buttonText}>Edit Profile</AppText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <AppText style={styles.buttonText}>Change Password</AppText>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button}>
        <AppText style={styles.buttonText}>Notification Settings</AppText>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <AppText style={styles.buttonText}>Logout</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  fullName: {
    fontSize: 20,
    color: colors.dark,
    fontWeight: "bold",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    color: colors.secondary,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    // position: "absolute",
    flex: 1,
    bottom: 0,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default AccountProfileScreen;
