import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

const LoginPage = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.jpeg")}
      style={styles.background}
    >
      {/* <LinearGradient
        colors={["rgba(135, 206, 235, 0.8)", "rgba(152, 251, 152, 0.8)"]}
        style={styles.gradient}
      > */}
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
        <Text style={styles.orText}>Or Sign Up with</Text>
        <View style={styles.socialButtons}>
          <Button
            icon={{
              name: "google",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            buttonStyle={styles.socialButton}
            containerStyle={styles.socialButtonContainer}
          />
          <Button
            icon={{
              name: "apple",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            buttonStyle={styles.socialButton}
            containerStyle={styles.socialButtonContainer}
          />
        </View>
      </View>
      {/* </LinearGradient> */}
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

export default LoginPage;

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
