import { UserDetailsProvider } from "@/components/ui/components/user/user-details/UserDetailsProvider";
import { SafeAreaView, StyleSheet } from "react-native";

const UserDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserDetailsProvider />
    </SafeAreaView>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
