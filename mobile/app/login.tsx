import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import HorizontalLine from "@/components/HorizontalLine";

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text h2 style={styles.title}>
          Welcome Back
        </Text>
        <View style={styles.form}>
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
            onPress={async () => {
              if (true) {
                // save token in local storage
                try {
                  await AsyncStorage.setItem("token", "tokenxyz12345");
                } catch (error) {
                  console.log(error);
                }

                // navigate to crops screen
                router.push("/crops");
              }
            }}
            title="Login"
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
          />
          <HorizontalLine color="#717171" gap={24} />
          <ThemedView
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <ThemedText style={styles.orText}>
              Don't have an account?
            </ThemedText>
            <Button
              title="Sign Up"
              buttonStyle={styles.signUpButton}
              onPress={() => router.push("/signup")}
            />
          </ThemedView>
        </View>
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
    color: "#252525",
    borderBottomWidth: 0,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
  },
  signUpButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingHorizontal: 18,
  },
  buttonContainer: {
    marginTop: 10,
  },
  orText: {
    color: "#252525",
    marginVertical: 10,
  },
});

export default LoginScreen;
