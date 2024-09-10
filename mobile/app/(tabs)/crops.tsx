import CropCard from "@/components/CropCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ICrop } from "@/types/Crop";
import React from "react";
import { FlatList } from "react-native";

const crops: ICrop[] = [
  {
    id: "potato",
    name: "Potato",
    farmerId: "1",
    farmerName: "John Doe",
    vareity: "Desi",
    updatedAt: "2023-01-28T10:30:00.000Z",
    quantity: "63 KG",
  },
];

const CropsScreen = () => {
  return (
    <ThemedView>
      <FlatList
        data={crops}
        renderItem={({ item }) => <CropCard onPress={() => {}} data={item} />}
      />
    </ThemedView>
  );
};

export default CropsScreen;
