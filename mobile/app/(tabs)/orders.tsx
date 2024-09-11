import CropCard from "@/components/CropCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { apiURL } from "../constants";
import { useAuth } from "@/hooks/useAuth";
import OrderCard from "@/components/OrderCard";

const OrdersScreen = () => {
  const [records, setRecords] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (token && token.trim() !== "") {
        try {
          setIsLoading(true);
          const response = await fetch(`${apiURL}/orders/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setRecords(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();
  }, [token]);

  if (isLoading) {
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
      <ThemedText style={{ fontSize: 24, margin: 18, fontWeight: "bold" }}>
        Total Listed Crops ({records.count})
      </ThemedText>
      <FlatList
        data={records.results}
        renderItem={({ item }) => <OrderCard data={item} />}
      />
    </ScrollView>
  );
};

export default OrdersScreen;
