import { GestureResponderEvent, Pressable } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export type ThemedButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
};

export function ThemedButton({ onPress, title }: ThemedButtonProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={[
        { backgroundColor: colors.button.background },
        styles.buttonWrapper,
      ]}
    >
      <Text style={{ color: colors.button.text }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 15,
  },
});
