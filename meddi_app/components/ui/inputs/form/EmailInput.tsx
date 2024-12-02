import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../text/TextInput";
import { isEmailValid } from "./utils/isEmailValid";

export const EmailInput = ({ disabled = false }: { disabled?: boolean }) => {
  const { control } = useFormContext<{ email: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="Email"
      disabled={disabled}
      name="email"
      rules={{
        required: "Fill in email",
        validate: (val) =>
          isEmailValid(val) ? undefined : "Please fill in valid email",
      }}
    ></ThemedTextInput>
  );
};
