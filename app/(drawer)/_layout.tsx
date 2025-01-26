import { Tabs } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const AppLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,

        }}
      >
        <Drawer.Screen
          name="welcome/index"
          options={{
            drawerLabel: "Home",
            title: "Welcome",
          }}
        />
        <Drawer.Screen
          name="todo/index"
          options={{
            drawerLabel: "Store",
            title: "My Store",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "About Me",
          }}
        />
        <Drawer.Screen
          name="dogs/index"
          options={{
            drawerLabel: "Dogs",
            title: "Dogs Facts",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
