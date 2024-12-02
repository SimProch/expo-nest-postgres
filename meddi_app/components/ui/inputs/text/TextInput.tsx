import React, { ForwardedRef, useState } from "react";
import { FieldValues, FieldPath, useController } from "react-hook-form";
import { ControlledTextInputProps } from "./TextInput.types";
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Animated,
  Pressable,
} from "react-native";
import { InputLabel } from "../label/InputLabel";
import { TextInput as NativeTextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { InputFootnote } from "../footnote/Footnote";
import { ThemedView } from "@/components/ThemedView";
import { spacing, useColors } from "@/hooks/useColors";
import { IconSymbol } from "../../IconSymbol";

export const ThemedTextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  {
    disabled,
    secureTextEntry,
    style,
    mask,
    label,
    placeholder,
    ...props
  }: ControlledTextInputProps<TFieldValues, TName>,
  forwardedRef: ForwardedRef<NativeTextInput>
) => {
  const colors = useColors();
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(props);
  const [isSecureTextEntry, setSecureTextEntry] = useState(
    secureTextEntry ?? false
  );

  const footnoteText = error?.message ? error.message : props.footnote;

  return (
    <ThemedView style={disabled && styles.disabled}>
      <InputLabel
        label={label}
        required={props.rules?.required}
        disabled={disabled}
      />
      <ThemedView
        style={[
          styles.inputContainer,
          { borderColor: colors.input.border },
          error && { borderColor: colors.input.error },
        ]}
      >
        <MaskInput
          {...props}
          mask={mask}
          value={value}
          placeholder={placeholder}
          ref={forwardedRef}
          onChangeText={(masked, unmasked, obfuscated) => {
            onChange(props.type === "unmasked" ? unmasked : masked);
            props.onChangeText?.(masked, unmasked, obfuscated);
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur();
            props.onBlur?.(e);
          }}
          style={styles.input}
          secureTextEntry={isSecureTextEntry}
          editable={disabled === undefined ? props.editable : !disabled}
        />
        {!disabled && secureTextEntry && (
          <Pressable onPress={() => setSecureTextEntry(!isSecureTextEntry)}>
            {isSecureTextEntry ? (
              <IconSymbol color={colors.icon} size={24} name="eye" />
            ) : (
              <IconSymbol color={colors.icon} size={24} name="eye.fill" />
            )}
          </Pressable>
        )}
      </ThemedView>
      <ThemedView style={styles.tailWrapper}>
        <ThemedView>
          {footnoteText && (
            <Animated.View>
              <InputFootnote
                message={footnoteText}
                type={error ? "error" : "footnote"}
                disabled={disabled}
              />
            </Animated.View>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
  input: {
    fontSize: spacing(4),
    width: "90%",
  },
  inputContainer: {
    alignItems: "center",
    borderRadius: spacing(2),
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing(1),
    marginTop: spacing(1),
    maxWidth: "100%",
    overflow: "hidden",
    padding: spacing(2),
  },
  tailWrapper: {
    display: "flex",
    flexDirection: "row",
    height: spacing(12),
    justifyContent: "space-between",
    marginHorizontal: spacing(1),
  },
});
