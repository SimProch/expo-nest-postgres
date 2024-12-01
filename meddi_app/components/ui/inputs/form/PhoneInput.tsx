import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../text/TextInput";

export const PhoneInput = ({ disabled = false }: { disabled?: boolean }) => {
  const { control } = useFormContext<{ phoneNumber: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="Phone Number"
      name="phoneNumber"
      rules={{ required: "Fill in phone" }}
      mask={[
        "+",
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
      ]}
      disabled={disabled}
    ></ThemedTextInput>
  );
};
