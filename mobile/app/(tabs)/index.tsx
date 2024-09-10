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

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const { isLoading, logout, token } = useAuth();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemedView>
      <ThemedView
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
      </ThemedView>

      <HorizontalLine />

      <ThemedText style={{ fontSize: 22, textAlign: "center" }}>
        {t("welcome")}
      </ThemedText>

      <ThemedText style={{ fontSize: 22, textAlign: "center" }}>
        {t("addCropPage.header")}
      </ThemedText>

      <ThemedText>{token}</ThemedText>

      <Button onPress={() => logout()}>Logout</Button>

      <HorizontalLine />

      <Button title="Go to Login" onPress={() => router.push("/login")} />
    </ThemedView>
  );
};

export default HomeScreen;
