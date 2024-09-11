import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Divider, FAB, Icon } from "@rneui/themed";
import { Link, router, useLocalSearchParams } from "expo-router";
import { apiURL } from "../constants";
import { useAuth } from "@/hooks/useAuth";

interface OrderDetails {
  pk: number;
  farmer: number;
  buyer: number;
  crop: number;
  quantity: number;
  price_per_kg: string;
  total_price: string;
  created_at: string;
  status: "pending" | "completed" | "canceled";
  farmer_agreed: boolean;
  buyer_agreed: boolean;
}

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [orderData, setOrderData] = useState<OrderDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiURL}/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setIsLoading(false);
      });
  }, [id, token]);

  if (isLoading || !orderData) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size={64} color="black" />
      </ThemedView>
    );
  }

  const handleAgree = async () => {
    try {
      const response = await fetch(`${apiURL}/orders/${id}/agree/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Refresh order data
        const updatedData = await response.json();
        setOrderData(updatedData);
      } else {
        console.error("Failed to agree to order");
      }
    } catch (error) {
      console.error("Error agreeing to order:", error);
    }
  };

  if (!orderData) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size={64} color="black" />
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <FAB
          icon={<Icon name="video" type="feather" color="white" />}
          color="#2089dc"
          placement="right"
          onPress={() => router.push("/vid-meeting")}
          style={{ margin: 16 }}
        />
        <ThemedText style={styles.title}>Order #{orderData.pk}</ThemedText>
        <DetailItem label="Farmer ID" value={orderData.farmer?.toString()} />
        <DetailItem label="Buyer ID" value={orderData.buyer?.toString()} />
        <DetailItem label="Crop ID" value={orderData.crop?.toString()} />
        <DetailItem label="Quantity" value={`${orderData.quantity} kg`} />
        <DetailItem label="Price per kg" value={`₹${orderData.price_per_kg}`} />
        <DetailItem label="Total Price" value={`₹${orderData.total_price}`} />
        <DetailItem
          label="Created At"
          value={new Date(orderData.created_at).toLocaleString()}
        />
        <DetailItem label="Status" value={orderData.status} />
        <DetailItem
          label="Farmer Agreed"
          value={orderData.farmer_agreed ? "Yes" : "No"}
        />
        <DetailItem
          label="Buyer Agreed"
          value={orderData.buyer_agreed ? "Yes" : "No"}
        />

        <Divider style={styles.divider} />

        <Link href={`/farmers/${orderData.farmer}`}>
          <ThemedText style={styles.link}>View Farmer's Profile</ThemedText>
        </Link>
        <Link href={`/buyers/${orderData.buyer}`}>
          <ThemedText style={styles.link}>View Buyer's Profile</ThemedText>
        </Link>
        <Link href={`/crops/${orderData.crop}`}>
          <ThemedText style={styles.link}>View Crop Details</ThemedText>
        </Link>

        <Divider style={styles.divider} />

        {orderData.status === "pending" && (
          <Button
            title={
              orderData.farmer_agreed ? "Already Agreed" : "Agree to Order"
            }
            onPress={handleAgree}
            disabled={orderData.farmer_agreed}
            buttonStyle={styles.agreeButton}
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
  link: {
    textAlign: "center",
    color: "blue",
    marginVertical: 8,
  },
  agreeButton: {
    backgroundColor: "#008000",
    marginTop: 16,
  },
});

export default OrderDetailsScreen;
