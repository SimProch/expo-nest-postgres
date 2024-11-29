import { ThemedView } from "@/components/ThemedView";
import { UserCamera } from "@/components/ui/components/camera/UserCamera";
import { StyleSheet } from "react-native";

const CameraScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <UserCamera />
    </ThemedView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
