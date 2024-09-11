import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card } from "@rneui/themed";
import axios from "axios";

const WeatherCard = ({ title, value, icon }) => (
  <Card containerStyle={styles.card}>
    <Card.Title>{title}</Card.Title>
    <View style={styles.cardContent}>
      <Image source={{ uri: `https:${icon}` }} style={styles.icon} />
      <Text style={styles.value}>{value}</Text>
    </View>
  </Card>
);

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data from the API
    axios
      .get(
        "https://api.weatherapi.com/v1/forecast.json?key=6c325a36605f46c7957122344241009&q=rajkot&days=4&aqi=yes&alerts=no"
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
    );
  }

  if (error) {
    return (
      <Text style={styles.error}>Error fetching data: {error.message}</Text>
    );
  }

  if (!weatherData) {
    return <Text style={styles.error}>No data available</Text>;
  }

  const { location, current, forecast } = weatherData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Report for {location.name}</Text>
      <WeatherCard
        title="Temperature"
        value={`${current.temp_c}°C / ${current.temp_f}°F`}
        icon={current.condition.icon}
      />
      <WeatherCard
        title="Condition"
        value={current.condition.text}
        icon={current.condition.icon}
      />
      <Text style={styles.subtitle}>Forecast for Next Days</Text>
      {forecast.forecastday.map((day, index) => (
        <WeatherCard
          key={index}
          title={`Day ${index + 1} Temp`}
          value={`${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F`}
          icon={day.day.condition.icon}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 50,
    height: 50,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default App;
