import { Link, Stack } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SignInScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign Up",
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Sign Up</ThemedText>
        <ThemedText>Username</ThemedText>
        <ThemedText>Password</ThemedText>
        <ThemedText>Login Button</ThemedText>

        <View>
          <ThemedText>Already have an account?</ThemedText>
          <Link href="/sign-in">Sign in!</Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
