import { router, useLocalSearchParams } from "expo-router";
import { useGetCityWeather } from "./hooks/useGetCityWeather";
import { RenderUnsettledUI } from "../../utils/RenderUnsettledUI";
import { GetCityDetailResponse } from "@/services/weather/weather.api.service.types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { spacing } from "@/hooks/useColors";
import { ThemedButton } from "@/components/ThemedButton";

export const CityDetailProvider = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const weatherQuery = useGetCityWeather(id);

  if (weatherQuery.status !== "success") {
    return <RenderUnsettledUI data={weatherQuery} />;
  }

  return <CityDetail data={weatherQuery.data} />;
};

const CityDetail = ({ data }: { data: GetCityDetailResponse }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.detailsContainer}>
        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">City: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.city}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Temperature: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.temperature} °C</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Description: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.description}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Postal Code: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.postalCode}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Longtitude: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.longtitude}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Latitude: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.latitude}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.button}>
        <ThemedButton
          title="Go back"
          onPress={async () => {
            if (router.canGoBack()) {
              router.back();
              return;
            }
            router.replace("/user-details");
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: spacing(4),
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
  },
  row: {
    flexDirection: "column",
    marginBottom: spacing(4),
    width: "100%",
  },
});
