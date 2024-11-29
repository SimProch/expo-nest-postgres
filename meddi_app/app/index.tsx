import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/ctx/session/SessionProvider";
import { Redirect } from "expo-router";

const Index = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Redirect href="/(logged-in)/(tabs)/user-details" />;
};

export default Index;
