
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store'; // ✅ Import SecureStore

export const index = () => {
  useEffect(() => {
    const checkLogin = async () => {
      try { // ✅ Added try-catch for error handling
        const userToken = await SecureStore.getItemAsync('authToken'); // ✅ Get token from SecureStore
        if (userToken == null) {
          router.replace("/user/login"); // Use replace to prevent back navigation to index
        } else {
          router.replace("/(drawer)/welcome"); // Use replace for same reason
        }
      } catch (error) { // ✅ Handle potential errors during token retrieval
        console.error("Error checking login status:", error);
        router.replace("/user/login"); // Redirect to login in case of error
      }
    };

    checkLogin();
  }, []);

  return null;
};

export default index;

const styles = StyleSheet.create({});