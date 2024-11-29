import { useGetUser } from "@/components/ui/components/user/user-details/hooks/useGetUser";
import { useUserId } from "@/hooks/utils/useUserId";
import { RenderUnsettledUI } from "../../utils/RenderUnsettledUI";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GetUserDataResponse } from "@/services/user/user.api.types";
import { StyleSheet } from "react-native";
import { spacing } from "@/hooks/useColors";
import { ThemedButton } from "@/components/ThemedButton";
import { router } from "expo-router";

export const UserDetailsProvider = () => {
  const id = useUserId();
  const userQuery = useGetUser(id);

  if (userQuery.status !== "success") {
    return <RenderUnsettledUI data={userQuery} />;
  }

  return <UserDetails data={userQuery.data} />;
};

const UserDetails = ({ data }: { data: GetUserDataResponse }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.detailsContainer}>
        <ThemedView style={[styles.row, styles.detail]}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Email: </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.email}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={[styles.row, styles.detail]}>
          <ThemedView>
            <ThemedText type="defaultSemiBold">Phone</ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>{data.phoneNumber}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedView style={styles.flex}>
            <ThemedText type="defaultSemiBold">City:</ThemedText>
          </ThemedView>
          <ThemedView style={styles.flex}>
            <ThemedText type="defaultSemiBold">Postal Code:</ThemedText>
          </ThemedView>
        </ThemedView>

        {data.cities.map((city) => {
          return (
            <ThemedView key={city.city} style={styles.row}>
              <ThemedView style={styles.flex}>
                <ThemedText>{city.city}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.flex}>
                <ThemedText>{city.postalCode}</ThemedText>
              </ThemedView>
            </ThemedView>
          );
        })}
      </ThemedView>

      <ThemedView style={styles.button}>
        <ThemedButton
          title="Update user details"
          onPress={() => {
            router.navigate("/(logged-in)/user-form");
          }}
        ></ThemedButton>
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
  detail: {
    flexDirection: "column",
    marginBottom: spacing(4),
  },
  detailsContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
});
