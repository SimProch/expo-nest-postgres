import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../inputs/text/TextInput";
import { isPasswordValid } from "./utils/isPasswordValid";

export const PasswordInput = () => {
  const { control } = useFormContext<{ password: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="Password"
      name="password"
      secureTextEntry={true}
      rules={{
        required: "Fill in password",
        validate: (val) =>
          isPasswordValid(val)
            ? undefined
            : "Enter a password that 8 letters and at least 1 lowercase character, one uppercase character and one number",
      }}
    ></ThemedTextInput>
  );
};
