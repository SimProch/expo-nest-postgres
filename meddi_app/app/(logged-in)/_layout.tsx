import { useSession } from "@/ctx/session/SessionProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading || !session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="user-form"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Update User Info",
        }}
      />
      <Stack.Screen
        name="city-detail"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "City detail",
        }}
      />
    </Stack>
  );
}
