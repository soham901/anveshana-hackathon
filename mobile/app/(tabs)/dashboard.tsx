import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { apiURL } from "../constants";
import { useAuth } from "@/hooks/useAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const FarmerCard = ({ farmerData }: any) => (
  <View style={styles.card}>
    <Image
      source={{ uri: apiURL + farmerData?.role_details?.profile_pic || "" }}
      style={styles.profilePic}
    />
    <Text style={styles.title}>Farmer</Text>
    <Text>Phone: {farmerData.role_details?.phone_no}</Text>
    <Text>Location: {farmerData.role_details?.location}</Text>
    <Text>Farm Size: {farmerData.role_details?.farm_size}</Text>
    <Text>Farming Since: {farmerData.role_details?.farming_since}</Text>
    <Text>Languages: {farmerData.role_details?.languages_spoken}</Text>
  </View>
);

// Buyer Component
const BuyerCard = ({ buyerData }: any) => (
  <View style={styles.card}>
    <Image
      source={{ uri: apiURL + buyerData.role_details.profile_pic }}
      style={styles.profilePic}
    />
    <Text style={styles.title}>Buyer</Text>
    <Text>Phone: {buyerData.role_details.phone_no}</Text>
    <Text>Location: {buyerData.role_details.location}</Text>
    <Text>Languages: {buyerData.role_details.languages_spoken}</Text>
    <Text>
      Preferred Quantity Unit: {buyerData.role_details.preferred_quantity_unit}
    </Text>
  </View>
);

const DashboardScreeN = () => {
  const { isLoading, token } = useAuth();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (data === undefined) {
      if (!token || token.trim() === "") {
        return;
      }

      fetch(`${apiURL}/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  if (
    isLoading ||
    data === undefined ||
    data?.results.length === 0 ||
    data === null
  )
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );

  let Cards;

  if (data?.results[0]?.role === "Farmer") {
    Cards = <FarmerCard farmerData={data} />;
  } else {
    Cards = <BuyerCard buyerData={data} />;
  }

  return (
    <ThemedView>
      <ThemedText>Dashboard</ThemedText>
      {Cards}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default DashboardScreeN;
