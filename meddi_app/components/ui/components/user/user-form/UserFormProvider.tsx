import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { FormProvider, useForm } from "react-hook-form";
import { CityInput } from "../../../inputs/form/CityInput";
import { EmailInput } from "../../../inputs/form/EmailInput";
import { PhoneInput } from "../../../inputs/form/PhoneInput";
import { PostalCodeInput } from "../../../inputs/form/PostalCodeInput";
import { useGetUser } from "@/components/ui/components/user/user-details/hooks/useGetUser";
import { spacing } from "@/hooks/useColors";
import { useUserId } from "@/hooks/utils/useUserId";
import { StyleSheet } from "react-native";
import { GetUserDataResponse } from "@/services/user/user.api.types";
import { RenderUnsettledUI } from "../../utils/RenderUnsettledUI";
import { useUpdateUser } from "@/components/ui/components/user/user-form/hooks/useUpdateUser";
import { UserFormData } from "./UserFormProvider.types";
import { router } from "expo-router";

export const UserFormProvider = () => {
  const id = useUserId();
  const userQuery = useGetUser(id);

  if (userQuery.status !== "success") {
    return <RenderUnsettledUI data={userQuery} />;
  }

  return <UserForm data={userQuery.data} userId={id!} />;
};

const UserForm = ({
  data,
  userId,
}: {
  data: GetUserDataResponse;
  userId: string;
}) => {
  const updateMutation = useUpdateUser();
  const form = useForm<UserFormData>({
    defaultValues: {
      email: data.email,
      phoneNumber: data.phoneNumber,
      postalCode: data.cities[0].postalCode,
      city: data.cities[0].city,
    },
  });

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.form}>
          <FormProvider {...form}>
            <EmailInput disabled />
            <PhoneInput />
            <ThemedView style={styles.location}>
              <ThemedView style={styles.city}>
                <CityInput />
              </ThemedView>
              <ThemedView style={styles.postalCode}>
                <PostalCodeInput />
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.buttons}>
              <ThemedView style={styles.button}>
                <ThemedButton
                  title="Save"
                  onPress={async () => {
                    form.handleSubmit(async (data: UserFormData) => {
                      const dirtyFields = form.formState.dirtyFields;
                      const isDirty = form.formState.isDirty;
                      if (!isDirty) {
                        return;
                      }

                      const params: Partial<UserFormData> = {};
                      Object.keys(data).forEach((key) => {
                        const _key = key as keyof typeof data;
                        if (dirtyFields[_key]) {
                          params[_key] = data[_key];
                        }
                      });

                      updateMutation.mutate({ userId, params });
                    })();
                  }}
                />
              </ThemedView>
              <ThemedView style={styles.button}>
                <ThemedButton
                  title="Cancel"
                  onPress={async () => {
                    router.navigate("/user-details");
                  }}
                />
              </ThemedView>
            </ThemedView>
          </FormProvider>
        </ThemedView>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flex: 1,
  },
  city: {
    flex: 1,
    marginRight: spacing(3),
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
    marginLeft: spacing(3),
  },
});
