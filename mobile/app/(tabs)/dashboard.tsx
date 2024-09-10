import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@rneui/base";
import React, { useEffect, useState } from "react";

const DashboardScreeN = () => {
  const { isLoading, logout, user } = useAuth();
  const [data, setData] = useState<any>();

  const { fetchProfile, token } = useAuth();

  // useEffect(() => {

  // }, []);

  return (
    <ThemedView>
      <ThemedText>Dashboard</ThemedText>
      <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText>
      <Button
        onPress={() => {
          fetchProfile().then((_data) => setData(_data));
        }}
      >
        CLICK {token}
      </Button>
    </ThemedView>
  );
};

export default DashboardScreeN;
