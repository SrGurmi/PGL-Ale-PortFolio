import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Header";
import Entypo from "@expo/vector-icons/Entypo";

export const tabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarActiveBackgroundColor: "grey",
        header: () => <Header />,
      }}
    >
      <Tabs.Screen
        name="hobbies"
        options={{
          title: "Hobbies",
          href: "/profile/hobbies",
          tabBarIcon: () => <Entypo name="video" />,
        }}
      />
      <Tabs.Screen
        name="git"
        options={{
          title: "Repositorio",
          href: "/profile/git",
          tabBarIcon: () => <Entypo name="github" />,
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({});
