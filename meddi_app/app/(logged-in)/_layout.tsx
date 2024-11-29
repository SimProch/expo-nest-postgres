import { ThemedView } from "@/components/ThemedView";
import { Logout } from "@/components/ui/access/Logout";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSession } from "@/ctx/session/SessionProvider";
import { spacing, useColors } from "@/hooks/useColors";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export const unstable_settings = {
  initialRouteName: "user-form",
};

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const colors = useColors();

  if (isLoading || !session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      initialRouteName="user-form"
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: true,
        headerRight: () => {
          return (
            <ThemedView style={{ marginRight: spacing(4) }}>
              <Logout />
            </ThemedView>
          );
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="user-form"
        options={{
          title: "",
          tabBarIcon: ({ color }) => {
            return <IconSymbol size={28} name="house.fill" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="camera" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: "",
          tabBarIcon: ({ color }) => {
            return <IconSymbol size={28} name="cloud" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
