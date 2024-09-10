import React from "react";
import { Button } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const LoginScreen = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemedView>
      <ThemedText>{t("welcome")}</ThemedText>
      <ThemedText>{t("login")}</ThemedText>
      <ThemedText>{t("email")}</ThemedText>
      <ThemedText>{t("password")}</ThemedText>
      <Button title="English" onPress={() => changeLanguage("en")} />
      <Button title="Hindi" onPress={() => changeLanguage("hn")} />
      <Button title="Gujarati" onPress={() => changeLanguage("gj")} />
    </ThemedView>
  );
};

export default LoginScreen;
