import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { EmailInput } from "@/components/ui/access/EmailInput";
import { PasswordInput } from "@/components/ui/access/PasswordInput";
import { useForm, FormProvider } from "react-hook-form";
import { PhoneInput } from "@/components/ui/access/PhoneInput";
import { CityInput } from "@/components/ui/access/CityInput";
import { PostalCodeInput } from "@/components/ui/access/PostalCodeInput";
import { spacing } from "@/hooks/useColors";
import { useSession } from "@/ctx/session/SessionProvider";

type FormData = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};

export default function SignInScreen() {
  const session = useSession();
  const form = useForm<FormData>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign Up",
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.signUp}>
          <FormProvider {...form}>
            <EmailInput />
            <PasswordInput />
            <PhoneInput />
            <ThemedView style={styles.location}>
              <ThemedView style={styles.postalCode}>
                <PostalCodeInput />
              </ThemedView>
              <ThemedView style={styles.city}>
                <CityInput />
              </ThemedView>
            </ThemedView>
            <ThemedButton
              title="Sign Up"
              onPress={async () => {
                form.handleSubmit(async (data: FormData) => {
                  await session.signUp({
                    email: data.email,
                    password: data.password,
                    phoneNumber: data.phoneNumber.split(" ").join(""),
                    postalCode: data.postalCode.split(" ").join(""),
                    city: data.city,
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
              <Link href="/sign-in" push={false} replace>
                Sign in!
              </Link>
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  city: {
    flex: 1,
    marginLeft: spacing(3),
  },
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
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postalCode: {
    flex: 1,
    marginRight: spacing(3),
  },
  signUp: {
    width: "80%",
  },
});
