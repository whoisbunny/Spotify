import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          bottom: 0,
          paddingTop: 10,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 4,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarLabelStyle: { color: "white" },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color={"white"} />
            ) : (
              <AntDesign name="home" size={24} color={"white"} />
            ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          tabBarLabelStyle: { color: "white" },
          title: "",

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color={"white"} />
            ) : (
              <Ionicons name="person-outline" size={24} color={"white"} />
            ),
        }}
      />
    </Tabs>
  );
}
