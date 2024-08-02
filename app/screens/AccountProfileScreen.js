import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AppText from "../components/AppText"; // Assuming you have a custom AppText component
import AppButton from "../components/AppButton"; // Assuming you have a custom AppButton component
import colors from "../config/colors"; // Assuming you have a colors config
import Icon from "../components/Icon"; // Assuming you have a custom Icon component
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import Screen from "../components/Screen";
import { LinearGradient } from "expo-linear-gradient";

function AccountProfileScreen({ onEditProfile, onLogout }) {
  const { user, setUser } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleLogout = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return (
    <Screen>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.tertiary]}
        style={styles.banner}
      >
        <AppText style={styles.screenName}>Profile</AppText>
        <AppText style={styles.remainingAmount}>
          {[user.firstName, " ", user.lastName]}
        </AppText>
      </LinearGradient>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <AppText style={styles.label}>First Name:</AppText>
              <AppText style={styles.value}>{user.firstName}</AppText>

              <AppText style={styles.label}>Last Name:</AppText>
              <AppText style={styles.value}>{user.lastName}</AppText>

              <AppText style={styles.label}>Email:</AppText>
              <AppText style={styles.value}>{user.email}</AppText>

              <AppText style={styles.label}>Phone Number:</AppText>
              <AppText style={styles.value}>{user.phoneNumber}</AppText>

              <AppText style={styles.label}>Date of Birth:</AppText>
              <AppText style={styles.value}>
                {formatDate(user.dateOfBirth)}
              </AppText>

              <AppText style={styles.label}>Account Created At:</AppText>
              <AppText style={styles.value}>
                {formatDate(user.createdAt)}
              </AppText>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                // onPress={onEditProfile}
              >
                <Icon name="account-edit" size={24} color={colors.white} />
                <AppText style={styles.editButtonText}>Edit Profile</AppText>
              </TouchableOpacity>
            </View>
            <AppButton
              title="Log Out"
              onPress={handleLogout}
              color={colors.secondary}
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  profileContainer: {
    backgroundColor: colors.tertiary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 15,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  banner: {
    height: "50%",
    backgroundColor: "blue",
    alignItems: "center",
  },
  content: {
    height: "75%",
    width: "90%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // borderWidth: 1,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "transparent",
    // paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  screenName: {
    fontSize: 18,
    marginTop: 10,
    color: colors.white,
    fontWeight: "bold",
  },
  remainingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 25,
  },
});

export default AccountProfileScreen;
