import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Icon, Image } from "@rneui/themed";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { apiURL } from "../constants";
import { useLocalSearchParams } from "expo-router";

interface SellerData {
  phone_no: string;
  location: string;
  profile_pic: string | null;
  languages_spoken: string;
  preferred_quantity_unit: string;
}

export default function SellerDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SellerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const sellerId = id;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiURL}/buyers/${sellerId}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch seller data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(err.message);
      });
  }, [sellerId]);

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size={64} color="black" />
      </ThemedView>
    );
  }

  if (error || !data) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          {error || "Failed to load seller details"}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {data.profile_pic ? (
          <Image
            source={{
              uri: data.profile_pic.replace("http://localhost:8000", apiURL),
            }}
            style={styles.profilePic}
          />
        ) : (
          <Icon
            name="user"
            type="feather"
            size={100}
            color="#bbb"
            containerStyle={styles.profilePicPlaceholder}
          />
        )}

        <ThemedText style={styles.title}>Seller Details</ThemedText>

        <ThemedView style={styles.infoContainer}>
          <InfoItem
            icon="phone"
            label="Phone"
            value={data.phone_no || "Not provided"}
          />
          <InfoItem
            icon="map-pin"
            label="Location"
            value={data.location || "Not provided"}
          />
          <InfoItem
            icon="globe"
            label="Languages"
            value={data.languages_spoken || "Not provided"}
          />
          <InfoItem
            icon="box"
            label="Preferred Quantity Unit"
            value={data.preferred_quantity_unit || "Not provided"}
          />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <ThemedView style={styles.infoItem}>
    <ThemedView style={styles.iconLabelContainer}>
      <Icon name={icon} type="feather" size={20} color="#333" />
      <ThemedText style={styles.label}>{label}:</ThemedText>
    </ThemedView>
    <ThemedText style={styles.value}>{value}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profilePicPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  infoContainer: {
    width: "100%",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  iconLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
  },
});
