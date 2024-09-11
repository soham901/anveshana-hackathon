import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Button, Divider, Input, ListItem } from "@rneui/themed";
import { Link, router, useLocalSearchParams } from "expo-router";
import { apiURL } from "../constants";
import { BottomSheet } from "@rneui/themed";
import { useAuth } from "@/hooks/useAuth";

interface CropDetails {
  id: number;
  name: string;
  variety: string;
  harvested_at: string;
  quantity: number;
  price_per_kg: string;
  location: string;
  irrigation_type: string;
  fertilizer_used: string;
  market_availability: boolean;
  storage_instruction: string;
  description: string;
  full_img: string | null;
  cover_img: string;
  category: number;
  farmer: number;
}

const CropDetailsScreen = () => {
  // get from url params
  const { id } = useLocalSearchParams();

  const [cropData, setCropData] = useState<CropDetails>();

  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const { token } = useAuth();

  const handleRequestProcurement = () => {
    console.log("ABC");

    cropData?.farmer &&
      fetch(`${apiURL}/procurement/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          farmer_id: cropData.farmer,
          crop_id: id,
          quantity: quantity,
          price_per_kg: cropData.price_per_kg,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setIsVisible(false);
          setIsSubmitting(false);
          setQuantity(0);
          router.push("/orders");
        })
        .catch((err) => {
          console.error(err);
          setIsSubmitting(false);
        });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiURL}/crops/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCropData(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading || !cropData) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size={64} color="black" />
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{cropData.name}</ThemedText>
        <Image
          source={{
            uri: cropData.cover_img.replace("http://localhost:8000", apiURL),
          }}
          style={styles.image}
        />

        <DetailItem label="Variety" value={cropData.variety} />
        <DetailItem label="Harvested At" value={cropData.harvested_at} />
        <DetailItem label="Quantity" value={`${cropData.quantity} kg`} />
        <DetailItem label="Price per kg" value={`₹${cropData.price_per_kg}`} />
        <DetailItem label="Location" value={cropData.location} />
        <DetailItem label="Irrigation Type" value={cropData.irrigation_type} />
        <DetailItem label="Fertilizer Used" value={cropData.fertilizer_used} />
        <DetailItem
          label="Market Availability"
          value={cropData.market_availability ? "Available" : "Not Available"}
        />
        <DetailItem
          label="Storage Instruction"
          value={cropData.storage_instruction}
        />
        <DetailItem label="Crop ID" value={cropData.id.toString()} />
        <Link
          style={{ textAlign: "center" }}
          href={`/farmers/${cropData.farmer}`}
        >
          <ThemedText style={styles.id}>Visit Farmer's Profile</ThemedText>
        </Link>

        <Divider style={styles.divider} />

        <Button
          title="Procurement Details"
          onPress={() => setIsVisible(true)}
        />
        <BottomSheet isVisible={isVisible}>
          <ListItem>
            <ListItem.Content style={{ gap: 12 }}>
              <ListItem.Title style={{}}>{cropData.name}</ListItem.Title>
              <ListItem.Subtitle>{cropData.description}</ListItem.Subtitle>
              <ThemedView>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Enter Quantity"
                  style={{ width: "100%" }}
                  value={quantity.toString()}
                  onChangeText={(value) => setQuantity(Number(value))}
                />
              </ThemedView>
              <Button
                loading={isSubmitting}
                title="Request Procurement"
                onPress={handleRequestProcurement}
                buttonStyle={{
                  backgroundColor: "#008000",
                }}
                containerStyle={{ width: "100%" }}
              />
              <Button
                title="Close"
                onPress={() => setIsVisible(false)}
                buttonStyle={{
                  backgroundColor: "#f00",
                }}
                containerStyle={{ width: "100%" }}
              />
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
      </ThemedView>
    </ScrollView>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <ThemedView style={styles.detailItem}>
    <ThemedText style={styles.label}>{label}:</ThemedText>
    <ThemedText style={styles.value}>{value}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    flex: 1,
  },
  value: {
    flex: 2,
    textAlign: "right",
  },
  divider: {
    marginVertical: 16,
  },
  id: {
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default CropDetailsScreen;
