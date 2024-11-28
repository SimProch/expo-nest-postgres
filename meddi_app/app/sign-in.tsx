import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { useSession } from "@/ctx/session/SessionProvider";
import { FormProvider, useForm } from "react-hook-form";
import { EmailInput } from "@/components/ui/access/EmailInput";
import { PasswordInput } from "@/components/ui/access/PasswordInput";

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
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.signIn}>
          <FormProvider {...form}>
            <EmailInput />
            <PasswordInput />
            <ThemedButton
              title="Sign in"
              onPress={async () => {
                form.handleSubmit(async (data: FormData) => {
                  console.log(data);
                  await session.signIn({
                    email: data.email,
                    password: data.password,
                  });
                })();
              }}
            />
          </FormProvider>
        </ThemedView>
        <ThemedView style={styles.footnote}>
          <ThemedText>
            Don't have an account yet?{" "}
            <ThemedText type="link">
              <Link href="/sign-up" push={false} replace>
                Sign up!
              </Link>
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
