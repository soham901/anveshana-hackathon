import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { router } from "expo-router";

const SignupPage = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text h2 style={styles.title}>
          Get Started
        </Text>
        <View style={styles.form}>
          <Input
            placeholder="Name"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Email"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
          <Button
            title="Sign Up"
            buttonStyle={styles.signUpButton}
            containerStyle={styles.buttonContainer}
          />
        </View>
        <Button
          onPress={() => router.push("/login")}
          title="Sign Up"
          style={styles.signUpButton}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "white",
    marginBottom: 30,
  },
  form: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, .75)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  signUpButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
  },
  buttonContainer: {
    marginTop: 10,
  },
  orText: {
    color: "white",
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    backgroundColor: "#3b5998",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  socialButtonContainer: {
    marginHorizontal: 10,
  },
});

export default SignupPage;

// import React from "react";
// import { Button } from "react-native";
// import { useTranslation } from "react-i18next";
// import { ThemedView } from "@/components/ThemedView";
// import { ThemedText } from "@/components/ThemedText";

// const LoginScreen = () => {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng: any) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <ThemedView>
//       <ThemedText>{t("welcome")}</ThemedText>
//       <ThemedText>{t("login")}</ThemedText>
//       <ThemedText>{t("email")}</ThemedText>
//       <ThemedText>{t("password")}</ThemedText>
//       <Button title="English" onPress={() => changeLanguage("en")} />
//       <Button title="Hindi" onPress={() => changeLanguage("hn")} />
//       <Button title="Gujarati" onPress={() => changeLanguage("gj")} />
//     </ThemedView>
//   );
// };

// export default LoginScreen;
