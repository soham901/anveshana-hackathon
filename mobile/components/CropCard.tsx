import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ICrop } from "@/types/Crop";
import { ThemedView } from "./ThemedView";
import { Icon, Image } from "@rneui/themed";

interface CropCardProps {
  data: ICrop;
  onPress: (crop: ICrop) => void;
}

const CropCard: React.FC<CropCardProps> = ({ data, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
      <View style={styles.header}>
        <Text style={styles.cropName}>{data.name}</Text>
        <Text style={styles.updatedAt}>
          Harvested On: {formatDate(data.updatedAt)}
        </Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/wheat.jpeg")}
          style={{
            borderRadius: 12,
            width: "100%",
            height: 200,
          }}
        />

        <ThemedView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <ThemedView style={{ alignContent: "flex-start" }}>
            <Text style={styles.label}>Vareity:</Text>
            <Text style={styles.value}>{data.vareity}</Text>
          </ThemedView>

          <ThemedView style={{ alignContent: "flex-start" }}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{data.quantity}</Text>
          </ThemedView>
        </ThemedView>

        <ThemedView
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 12,
          }}
        >
          <Text style={{}}>Farmer: {data.farmerName}</Text>
          <Icon name="arrowright" type="antdesign" color="black" />
        </ThemedView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.id}>ID: {data.id}</Text>
      </View>
    </TouchableOpacity>
  );

  // return (
  //   <View style={styles.card}>
  //     <View style={styles.header}>
  //       <Text style={styles.headerText}>Date: {date}</Text>
  //       <TouchableOpacity style={styles.moreDetailsButton}>
  //         <Text style={styles.moreDetailsText}>More Details</Text>
  //       </TouchableOpacity>
  //     </View>

  //     <View style={styles.formGroup}>
  //       <Text style={{ fontSize: 24 }}>{farmerName}</Text>
  //     </View>

  //     <View style={styles.formGroup}>
  //       <Text style={styles.label}>Farmer Name: Soham</Text>
  //     </View>

  //     <View style={styles.formGroup}>
  //       <Text style={styles.label}>Farmer No. : 9016607937</Text>
  //     </View>

  //     <View style={styles.formGroup}>
  //       <Text style={styles.label}>Variety : {variety}</Text>
  //     </View>

  //     <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
  //       <Text style={styles.submitButtonText}>Complete the form</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 16,
//     margin: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   moreDetailsButton: {
//     backgroundColor: "#f0f0f0",
//     padding: 8,
//     borderRadius: 4,
//   },
//   moreDetailsText: {
//     color: "blue",
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     padding: 8,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//   },
//   submitButton: {
//     backgroundColor: "#4a90e2",
//     padding: 12,
//     borderRadius: 4,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  updatedAt: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  id: {
    fontSize: 12,
    color: "#999",
  },
});

export default CropCard;

// import React from "react";
// import { ThemedText } from "./ThemedText";
// import { ICrop } from "@/types/Crop";

// const CropCard = (props: ICrop) => {
//   return <ThemedText>{props.name}</ThemedText>;
// };

// export default CropCard;
