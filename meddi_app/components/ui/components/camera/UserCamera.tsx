import { ThemedView } from "@/components/ThemedView";
import { spacing } from "@/hooks/useColors";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../../IconSymbol";

export const UserCamera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <IconSymbol size={24} name="camera.rotate" color="black" />
          </TouchableOpacity>
        </ThemedView>
      </CameraView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "column",
  },
  // eslint-disable-next-line react-native/no-color-literals
  buttonContainer: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "column",
    margin: spacing(15),
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    paddingBottom: spacing(2),
    textAlign: "center",
  },
});
