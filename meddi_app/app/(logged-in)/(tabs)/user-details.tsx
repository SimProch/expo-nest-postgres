import { ThemedView } from "@/components/ThemedView";
import { UserDetailsProvider } from "@/components/ui/components/user/user-details/UserDetailsProvider";
import { StyleSheet } from "react-native";

const UserDetailsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <UserDetailsProvider />
    </ThemedView>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
