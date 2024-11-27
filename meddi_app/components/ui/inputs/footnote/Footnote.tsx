import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

type Props = {
  message: string;
  type: "footnote" | "error";
  disabled?: boolean;
};

export const InputFootnote = ({ message, type, disabled }: Props) => {
  return (
    <ThemedView>
      <ThemedText
        type={type === "error" ? "error" : disabled ? "disabled" : "default"}
      >
        {message}
      </ThemedText>
    </ThemedView>
  );
};
