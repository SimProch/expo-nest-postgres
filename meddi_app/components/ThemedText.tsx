import { Text, type TextProps, StyleSheet } from "react-native";

import { useColors } from "@/hooks/useColors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "error"
    | "disabled";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colors = useColors();

  return (
    <Text
      style={[
        { color: colors.text },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        ...(type === "link" ? [styles.link, { color: colors.link }] : []),
        type === "disabled" ? styles.disabled : undefined,
        ...(type === "error" ? [styles.error, { color: colors.error }] : []),
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  disabled: {
    opacity: 0.38,
  },
  error: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
});
