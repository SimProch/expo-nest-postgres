import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { MaskInputProps } from "react-native-mask-input";

export type BaseTextInputProps = MaskInputProps & {
  /**
   * Specifies whether input is disabled or not. Input is not disabled by default.
   */
  disabled?: boolean;
};

/**
 * Text input props for component containing more than just a base text input.
 * The value is omitted as it is controlled text input and value is sorted internally
 */
type TextInputProps = Omit<BaseTextInputProps, "value"> & {
  /**
   * Specifies the title for the input. If specified, a header will be shown above the input. Empty by default
   */
  label?: string;
  /**
   * Specifies the footnote appearing under a current input. Empty by default.
   */
  footnote?: string;
  /**
   * Specifies the maximum number of allowed characters for current input.
   * If defined, shows current and maximum number of characters below the input.
   * Defaults to undefined.
   */
  maxCharCount?: number;
};

export type ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  TextInputProps & {
    /**
     * Specifies whether form control works with masked or unmasked text. Works with masked by default.
     */
    type?: "masked" | "unmasked";
  };
