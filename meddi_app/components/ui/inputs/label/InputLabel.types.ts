import { ValidationRule } from "react-hook-form";

export type InputLabelProps = {
  label?: string;
  required?: string | ValidationRule<boolean>;
  disabled?: boolean;
};
