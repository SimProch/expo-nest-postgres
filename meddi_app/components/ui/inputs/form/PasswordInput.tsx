import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../text/TextInput";
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
            : "Fill in 8 letter password containing \nlowercase, uppercase and number",
      }}
    ></ThemedTextInput>
  );
};
