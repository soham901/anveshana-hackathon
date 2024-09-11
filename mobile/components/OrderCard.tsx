import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, Divider, Icon, Button } from "@rneui/themed";
import { router } from "expo-router";

interface OrderData {
  pk: string;
  farmer_id: string;
  total_price: string;
  created_at: string;
  status: string;
}

interface OrderCardProps {
  data: OrderData;
}

export default function OrderCard({ data }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFA500";
      case "processing":
        return "#1E90FF";
      case "shipped":
        return "#32CD32";
      case "delivered":
        return "#228B22";
      default:
        return "#808080";
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <ScrollView>
        <Card.Title style={styles.title}>Order #{data.pk}</Card.Title>
        <View style={styles.content}>
          <InfoItem label="Farmer ID" value={data.farmer_id} />
          <InfoItem label="Total Price" value={`${data.total_price}`} />
          <InfoItem label="Order Date" value={formatDate(data.created_at)} />
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Status:</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(data.status) },
              ]}
            >
              <Text style={styles.statusText}>{data.status}</Text>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Button
          onPress={() => router.push(`/orders/${data.pk}`)}
          buttonStyle={styles.button}
        >
          <Text style={styles.buttonText}>View Details</Text>
          <Icon name="arrowright" type="antdesign" color="white" />
        </Button>
      </ScrollView>
    </Card>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 0,
    margin: 10,
  },
  title: {
    paddingTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 15,
  },
  infoItem: {
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  itemContainer: {
    marginLeft: 15,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingRight: 12,
  },
});
