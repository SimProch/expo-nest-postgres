import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../inputs/text/TextInput";

export const PhoneInput = () => {
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
    ></ThemedTextInput>
  );
};
