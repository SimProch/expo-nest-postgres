import { useUserId } from "@/hooks/utils/useUserId";
import { useGetUserWeather } from "../hooks/useGetUserWeather";
import { RenderUnsettledUI } from "../../utils/RenderUnsettledUI";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { spacing } from "@/hooks/useColors";
import { useMemo } from "react";
import { GetUserWeatherResponse } from "@/services/weather/weather.api.service.types";
import { router } from "expo-router";

export const WeatherProvider = () => {
  const id = useUserId();
  const weatherQuery = useGetUserWeather(id);

  if (weatherQuery.status !== "success") {
    return <RenderUnsettledUI data={weatherQuery} />;
  }

  return <Weather data={weatherQuery.data} />;
};

const Weather = ({ data }: { data: GetUserWeatherResponse }) => {
  const chunks = useMemo(() => {
    const chunks = [];
    const chunkSize = 2;
    for (let i = 0; i < data.length; i += 2) {
      const chunk = data.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }, [data]);

  return (
    <ThemedView style={styles.container}>
      {chunks.map((chunk, index) => {
        return (
          <ThemedView key={index} style={styles.weatherChunk}>
            {chunk.map((datum) => {
              return (
                <Pressable
                  key={datum.id}
                  onPress={() => {
                    router.push({
                      pathname: "/(logged-in)/city-detail",
                      params: { id: datum.id },
                    });
                  }}
                >
                  <ThemedView style={styles.weather}>
                    <ThemedText>{datum.city}</ThemedText>
                    <ThemedText>{datum.temperature} °C</ThemedText>
                  </ThemedView>
                </Pressable>
              );
            })}
          </ThemedView>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
  },
  weather: {
    flex: 1,
    padding: spacing(4),
  },
  weatherChunk: {
    flexDirection: "row",
    marginBottom: spacing(4),
  },
});
