import { ThemedView } from "@/components/ThemedView";
import { CameraComponent } from "@/components/ui/components/camera/camera";
import { StyleSheet } from "react-native";

const CameraScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <CameraComponent />;
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
