import { useFormContext } from "react-hook-form";
import { isEmailValid } from "../../access/utils/isEmailValid";
import { ThemedTextInput } from "../text/TextInput";

export const EmailInput = () => {
  const { control } = useFormContext<{ email: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="Email"
      name="email"
      rules={{
        required: "Fill in email",
        validate: (val) =>
          isEmailValid(val) ? undefined : "Please fill in valid email",
      }}
    ></ThemedTextInput>
  );
};
