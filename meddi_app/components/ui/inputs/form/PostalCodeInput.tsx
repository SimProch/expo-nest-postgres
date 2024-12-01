import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../text/TextInput";

export const PostalCodeInput = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const { control } = useFormContext<{ postalCode: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="Postal Code"
      name="postalCode"
      rules={{ required: "Fill in postal code" }}
      mask={[/\d/, /\d/, /\d/, " ", /\d/, /\d/]}
      disabled={disabled}
    ></ThemedTextInput>
  );
};
