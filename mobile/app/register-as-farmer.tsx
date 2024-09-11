import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Input, Image } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { apiURL } from "./constants";

interface FormData {
  phone_no: string | null;
  location: string | null;
  profile_pic: string | null;
  is_verified: boolean;
  languages_spoken: string | null;
  preferred_quantity_unit: string | null;
  farm_size: string | null;
  farming_since: Date | null;
  preferred_selling_method: string | null;
}

export default function RegisterFarmerPage() {
  const [formData, setFormData] = useState<FormData>({
    phone_no: null,
    location: null,
    profile_pic: null,
    is_verified: false,
    languages_spoken: null,
    preferred_quantity_unit: null,
    farm_size: null,
    farming_since: null,
    preferred_selling_method: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value || null }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prevData) => ({ ...prevData, farming_since: selectedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, farming_since: null }));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prevData) => ({
        ...prevData,
        profile_pic: result.assets[0].uri,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (formData.phone_no === null)
      newErrors.phone_no = "Phone number is required";
    if (formData.location === null) newErrors.location = "Location is required";
    if (formData.languages_spoken === null)
      newErrors.languages_spoken = "Languages spoken is required";
    if (formData.farm_size === null)
      newErrors.farm_size = "Farm size is required";
    if (formData.preferred_selling_method === null)
      newErrors.preferred_selling_method =
        "Preferred selling method is required";
    if (formData.preferred_quantity_unit === null)
      newErrors.preferred_quantity_unit = "Preferred quantity unit is required";
    if (formData.farming_since === null)
      newErrors.farming_since = "Farming since date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      fetch(`${apiURL}/farmers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Include form data in the request body
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to register farmer");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          Alert.alert("Success", "Farmer registered successfully");
        })
        .catch((err) => {
          console.error(err);
          Alert.alert("Error", "Failed to register farmer");
        });
    } else {
      Alert.alert("Validation Error", "Please fill out all required fields");
    }
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Register as Farmer</ThemedText>

        <TouchableOpacity
          onPress={pickImage}
          style={styles.imagePickerContainer}
        >
          {formData.profile_pic ? (
            <Image
              source={{ uri: formData.profile_pic }}
              style={styles.profilePic}
            />
          ) : (
            <ThemedText>Select Profile Picture</ThemedText>
          )}
        </TouchableOpacity>

        <Input
          placeholder="Phone Number"
          value={formData.phone_no || ""}
          onChangeText={(value) => handleInputChange("phone_no", value)}
          errorMessage={errors.phone_no}
        />

        <Input
          placeholder="Location"
          value={formData.location || ""}
          onChangeText={(value) => handleInputChange("location", value)}
          errorMessage={errors.location}
        />

        <Input
          placeholder="Languages Spoken"
          value={formData.languages_spoken || ""}
          onChangeText={(value) => handleInputChange("languages_spoken", value)}
          errorMessage={errors.languages_spoken}
        />

        <ThemedText>Preferred Quantity Unit</ThemedText>
        <Picker
          selectedValue={formData.preferred_quantity_unit || "kg"}
          onValueChange={(value) =>
            handleInputChange("preferred_quantity_unit", value)
          }
          style={styles.picker}
        >
          <Picker.Item label="Kilograms" value="kg" />
          <Picker.Item label="Quintals" value="qt" />
          <Picker.Item label="Grams" value="g" />
          <Picker.Item label="Tons" value="ton" />
        </Picker>

        <Input
          placeholder="Farm Size"
          value={formData.farm_size || ""}
          onChangeText={(value) => handleInputChange("farm_size", value)}
          keyboardType="numeric"
          errorMessage={errors.farm_size}
        />

        <ThemedText>Farming Since</ThemedText>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <ThemedText>
            {formData.farming_since
              ? formData.farming_since.toDateString()
              : "Select Date"}
          </ThemedText>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.farming_since || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Input
          placeholder="Preferred Selling Method"
          value={formData.preferred_selling_method || ""}
          onChangeText={(value) =>
            handleInputChange("preferred_selling_method", value)
          }
          errorMessage={errors.preferred_selling_method}
        />

        <Button
          title="Register"
          onPress={handleSubmit}
          buttonStyle={styles.submitButton}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  imagePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 75,
    marginBottom: 16,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  picker: {
    marginBottom: 16,
  },
  datePickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginTop: 16,
  },
});
