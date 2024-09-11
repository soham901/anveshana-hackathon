import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

const InfoCard = ({ title, subtitle }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Ionicons name="phone-portrait-outline" size={40} color="#4CAF50" />
      <View style={styles.leafIcon}>
        <Ionicons name="leaf" size={20} color="#4CAF50" />
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const ScrollableInfoCards = () => {
  const cardData = [
    {
      title: "अपनी बिक्री बढ़ाएं",
      subtitle: "किसानों से फसल की फोटो मंगवाए AgriTech से फ्री सलाह पाए।",
    },
    {
      title: "फसल की जानकारी पाएं",
      subtitle: "AgriTech के विशेषज्ञों से फसल संबंधित सलाह लें।",
    },
    {
      title: "बाजार मूल्य जानें",
      subtitle: "अपने क्षेत्र के फसलों के वर्तमान बाजार मूल्य की जानकारी पाएं।",
    },
    {
      title: "बाजार मूल्य जानें",
      subtitle: "अपने क्षेत्र के फसलों के वर्तमान बाजार मूल्य की जानकारी पाएं।",
    },
  ];

  return (
    <View style={styles.scrollView}>
      {cardData.map((card, index) => (
        <InfoCard key={index} title={card.title} subtitle={card.subtitle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // height:"100vh"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 150,
    backgroundColor: "#FFE0B2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  leafIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F00",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
  },
});

export default ScrollableInfoCards;
