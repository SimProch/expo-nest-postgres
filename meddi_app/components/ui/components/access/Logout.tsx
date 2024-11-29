import { useSession } from "@/ctx/session/SessionProvider";
import { Pressable } from "react-native";
import { IconSymbol } from "../../IconSymbol";

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
