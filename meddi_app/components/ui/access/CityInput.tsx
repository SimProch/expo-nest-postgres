import { useFormContext } from "react-hook-form";
import { ThemedTextInput } from "../inputs/text/TextInput";
import { isCityValid } from "./utils/isCityValid";

export const CityInput = () => {
  const { control } = useFormContext<{ city: string }>();

  return (
    <ThemedTextInput
      control={control}
      label="City"
      name="city"
      rules={{
        required: "Fill in City",
        validate: (val) =>
          isCityValid(val) ? undefined : "Enter a valid city",
      }}
    ></ThemedTextInput>
  );
};
