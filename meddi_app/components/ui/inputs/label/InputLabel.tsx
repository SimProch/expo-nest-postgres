import React from "react";
import { StyleSheet } from "react-native";
import { InputLabelProps } from "./InputLabel.types";
import { ThemedText } from "@/components/ThemedText";

export function InputLabel({ label, required }: InputLabelProps) {
  if (!label) return <></>;

  return (
    <ThemedText style={styles.inputFieldLabel}>
      {`${label}${isRequired(required) ? " *" : ""}`}
    </ThemedText>
  );
}

const isRequired = (required: InputLabelProps["required"]) => {
  const stringified = Object.prototype.toString.call(required);
  if (typeof required === "string" || stringified === "[object Object]") {
    return true;
  }

  return required ?? false;
};

const styles = StyleSheet.create({
  inputFieldLabel: {
    marginHorizontal: 4,
    marginTop: 4,
  },
});
