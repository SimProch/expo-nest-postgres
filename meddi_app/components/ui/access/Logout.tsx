import { useSession } from "@/ctx/session/SessionProvider";
import { IconSymbol } from "../IconSymbol";
import { Pressable } from "react-native";

export const Logout = () => {
  const sesh = useSession();
  return (
    <Pressable
      onPress={() => {
        sesh.signOut();
      }}
    >
      <IconSymbol
        name={"rectangle.portrait.and.arrow.right"}
        size={28}
        color="black"
      />
    </Pressable>
  );
};
