import "expo-dev-client";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/ctx/session/SessionProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
