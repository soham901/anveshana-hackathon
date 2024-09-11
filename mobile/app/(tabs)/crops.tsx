import CropCard from "@/components/CropCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ICrop } from "@/types/Crop";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { apiURL } from "../constants";

const CropsScreen = () => {
  const [crops, setCrops] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiURL}/crops/`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setIsLoading(false);
      });
  }, []);

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
        Total Listed Crops ({crops.count})
      </ThemedText>
      <FlatList
        data={crops.results}
        renderItem={({ item }) => <CropCard data={item} />}
      />
    </ScrollView>
  );
};

export default CropsScreen;
