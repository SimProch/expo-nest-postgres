import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { FormProvider, useForm } from "react-hook-form";
import { CityInput } from "../../inputs/form/CityInput";
import { EmailInput } from "../../inputs/form/EmailInput";
import { PasswordInput } from "../../inputs/form/PasswordInput";
import { PhoneInput } from "../../inputs/form/PhoneInput";
import { PostalCodeInput } from "../../inputs/form/PostalCodeInput";
import { useGetUser } from "@/hooks/api/user/useGetUser";
import { spacing } from "@/hooks/useColors";
import { useUserId } from "@/hooks/utils/useUserId";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { GetUserDataResponse } from "@/services/user/user.api.types";

type FormData = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};

export const UserFormProvider = () => {
  const id = useUserId();
  const userQuery = useGetUser(id);

  if (userQuery.status !== "success") {
    return <ThemedText>Loading or error</ThemedText>;
  }

  return <UserForm data={userQuery.data} />;
};

const UserForm = ({ data }: { data: GetUserDataResponse }) => {
  const form = useForm<FormData>({
    defaultValues: {
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      postalCode: data.postalCode,
      city: data.city,
    },
  });

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.form}>
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
              title="Update"
              onPress={async () => {
                // form.handleSubmit(async (data: FormData) => {
                // await session.signUp({
                //   email: data.email,
                //   password: data.password,
                //   phoneNumber: data.phoneNumber.split(" ").join(""),
                //   postalCode: data.postalCode.split(" ").join(""),
                //   city: data.city,
                // });
                // })();
              }}
            />
          </FormProvider>
        </ThemedView>
      </ThemedView>
    </>
  );
};

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
  form: {
    width: "80%",
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postalCode: {
    flex: 1,
    marginRight: spacing(3),
  },
});
