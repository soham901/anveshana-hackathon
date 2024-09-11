import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { apiURL } from "../constants";
import { ActivityIndicator, ScrollView, StyleSheet, Image } from "react-native";
import { Icon } from "@rneui/themed";

interface FarmerData {
  user: number;
  phone_no: string;
  location: string;
  profile_pic: string;
  is_verified: boolean;
  languages_spoken: string;
  preferred_quantity_unit: string;
  farm_size: number;
  farming_since: string;
  preferred_selling_method: string;
}

const FarmerProfilePage = () => {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FarmerData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiURL}/farmers/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setData(data);
      });
  }, [id]);

  if (isLoading || !data) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size={64} color="black" />
      </ThemedView>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Image
          source={{
            uri: data.profile_pic.replace("http://localhost:8000", apiURL),
          }}
          style={styles.profilePic}
        />
        <ThemedText style={styles.name}>Farmer ID: {data.user}</ThemedText>

        <ThemedView style={styles.infoContainer}>
          <InfoItem icon="phone" label="Phone" value={data.phone_no} />
          <InfoItem icon="map-pin" label="Location" value={data.location} />
          <InfoItem
            icon="check-circle"
            label="Verification Status"
            value={data.is_verified ? "Verified" : "Not Verified"}
          />
          <InfoItem
            icon="globe"
            label="Languages"
            value={data.languages_spoken}
          />
          <InfoItem
            icon="box"
            label="Preferred Quantity Unit"
            value={data.preferred_quantity_unit}
          />
          <InfoItem
            icon="trending-up"
            label="Farm Size"
            value={`${data.farm_size} acres`}
          />
          <InfoItem
            icon="calendar"
            label="Farming Since"
            value={formatDate(data.farming_since)}
          />
          <InfoItem
            icon="shopping-cart"
            label="Preferred Selling Method"
            value={data.preferred_selling_method}
          />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

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
  name: {
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

export default FarmerProfilePage;
