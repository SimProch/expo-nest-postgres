import { ThemedView } from "@/components/ThemedView";
import { WeatherProvider } from "@/components/ui/components/weather/weather-list/Weather";
import { StyleSheet } from "react-native";

const WeatherScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <WeatherProvider />
    </ThemedView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
