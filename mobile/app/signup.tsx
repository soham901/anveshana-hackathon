import React from "react";
import { View, ImageBackground, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import HorizontalLine from "@/components/HorizontalLine";

import { apiURL } from "./constants";

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  type Data = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  };

  const onSubmit = async (data: Data) => {
    try {
      const res = await fetch(`${apiURL}/register-user/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (JSON.parse(await res.json()).email !== data.email) {
        alert("Error");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    await AsyncStorage.setItem("token", "tokenxyz12345");
    router.push("/login");
  };

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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="first_name"
          />
          {errors.first_name && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="last_name"
          />
          {errors.last_name && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="username"
          />
          {errors.username && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

          <Button
            buttonStyle={styles.loginButton}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
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
              Already have an account?
            </ThemedText>
            <Button
              title="Login"
              buttonStyle={styles.signUpButton}
              onPress={() => router.push("/login")}
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
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderColor: "#2c2c2c",
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 8,
    fontSize: 18,
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

export default SignupScreen;
