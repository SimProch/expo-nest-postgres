import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { useSession } from "@/ctx/session/SessionProvider";
import { ThemedTextInput } from "@/components/ui/inputs/text/TextInput";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const session = useSession();
  const form = useForm<FormData>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign In",
          headerBackVisible: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.signIn}>
          <ThemedTextInput
            label="Email"
            name="email"
            control={form.control}
            rules={{ required: "Fill in email" }}
          ></ThemedTextInput>
          <ThemedTextInput
            label="Password"
            name="password"
            control={form.control}
            rules={{ required: "Fill in password" }}
            secureTextEntry={true}
          ></ThemedTextInput>
          <ThemedButton
            title="Sign in"
            onPress={async () => {
              form.handleSubmit(async (data: FormData) => {
                await session.signIn(data.email, data.password);
              })();
            }}
          />
        </ThemedView>
        <ThemedView style={styles.footnote}>
          <ThemedText>
            Don't have an account yet?{" "}
            <ThemedText type="link">
              <Link href="/sign-up">Sign up!</Link>
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  footnote: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  signIn: {
    width: "80%",
  },
});
