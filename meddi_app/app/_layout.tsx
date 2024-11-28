import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@formatjs/intl-displaynames/locale-data/nl";
import { SessionProvider } from "@/ctx/session/SessionProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="index" redirect={true} />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
          <Stack.Screen name="(logged-in)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SessionProvider>
    </QueryClientProvider>
  );
}
