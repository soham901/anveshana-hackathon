import HorizontalLine from "@/components/HorizontalLine";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Topmenu from "@/components/Topmenu";
import ScrollableInfoCards from "@/components/Scrollbox";
import { Picker } from "@react-native-picker/picker";

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const { isLoading, logout, token } = useAuth();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <HeaderComponent logout={logout} token={token} i18n={i18n} />
        <Topmenu />
        <ScrollableInfoCards />
        {/* <ThemedView
          style={{
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <Button title="English" onPress={() => changeLanguage("en")} />
          <Button title="Hindi" onPress={() => changeLanguage("hn")} />
          <Button title="Gujarati" onPress={() => changeLanguage("gj")} />
        </ThemedView> */}

        {/* <HorizontalLine /> */}
      </SafeAreaView>
    </ScrollView>
  );
};

const HeaderComponent = ({
  i18n,
  logout,
  token,
}: {
  i18n: any;
  logout: any;
  token: any;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.title}>Fasal Mandi</Text>
        </View>
        <View style={styles.rightSection}>
          {token ? (
            <Button onPress={() => logout()}>Logout</Button>
          ) : (
            <Button title="Login" onPress={() => router.push("/login")} />
          )}
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6F3FF", // Light blue background
    padding: 10,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileimagecontainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  profileImage: { width: "100%", height: "100%", resizeMode: "cover" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A89E6", // Blue color for the title
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A89E6", // Blue background for balance
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  balanceText: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  picker: {
    marginBottom: 16,
  },
});

export default HomeScreen;
