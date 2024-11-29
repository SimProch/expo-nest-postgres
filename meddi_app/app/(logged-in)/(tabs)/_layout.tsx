import { ThemedView } from "@/components/ThemedView";
import { Logout } from "@/components/ui/components/access/Logout";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { spacing, useColors } from "@/hooks/useColors";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export const unstable_settings = {
  initialRouteName: "user-details",
};

export default function TabLayout() {
  const colors = useColors();

  return (
    <>
      <Tabs
        initialRouteName="user-details"
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
          name="user-details"
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
    </>
  );
}
