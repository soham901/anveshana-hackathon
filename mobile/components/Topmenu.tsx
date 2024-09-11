import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { router } from "expo-router";

const Topmenu = () => {
  const icons = [
    { color: "#F5E6D3", label: "Weather", link: "/weather" },
    { color: "#FFF9C4", label: "Orders", link: "/orders" },
    { color: "#E8F5E9", label: "Kheyti ki Baat", link: "/vid-meeting" },
  ];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          style={styles.iconContainer}
          onPress={() => {
            // @ts-ignore
            router.push(icon.link as string);
          }}
        >
          <View style={[styles.iconWrapper, { backgroundColor: icon.color }]}>
            {/* You can add some basic shapes here to represent the icon content */}
            <View
              style={[
                styles.mockIconElement,
                {
                  backgroundColor:
                    index === 0
                      ? "#87CEEB"
                      : index === 1
                      ? "#4CAF50"
                      : "#9E9E9E",
                },
              ]}
            />
          </View>
          <Text style={styles.label}>{icon.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  mockIconElement: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  label: {
    fontSize: 14,
    textAlign: "center",
    color: "#333333",
  },
});

export default Topmenu;
