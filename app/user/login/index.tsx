import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { getDefaultUser, User } from "../../../types/User";
import ToastManager, { Toast } from "toastify-react-native";
import LoginService from "../../../service/loginService";
import * as SecureStore from 'expo-secure-store'; // ✅ Import SecureStore

export const loginPage = () => {
  const [currentUser, setCurrentUser] = useState<User>(getDefaultUser());

  const inputChange = (name: string, value: string) => {
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (
        !currentUser.email.includes("@") ||
        (!currentUser.email.endsWith(".com") &&
            !currentUser.email.endsWith(".net"))
    ) {
      Toast.error("The email format is not correct");
    } else if (currentUser.pswd.length < 8) {
      Toast.error("The password format is not correct");
    } else {
      try {
        const loginResponse = await LoginService.loginUser({
          email: currentUser.email,
          pswd: currentUser.pswd,
        });
        console.log("LoginService response in loginPage:", loginResponse);

        // ✅ Modifica la condición para verificar response.object y response.object.token
        if (loginResponse && loginResponse.statusCode === 200 && loginResponse.object && loginResponse.object.token) {
          // ✅ Extrae el token de response.object.token
          const token = loginResponse.object.token;
          console.log("Login successful, token received:", token);

          await SecureStore.setItemAsync('authToken', token);

          router.navigate("/(drawer)/welcome");
          setCurrentUser(getDefaultUser());
        } else {
          console.log("Login failed or token not received. Response:", loginResponse); // ✅ Loguea la respuesta completa para debugging
          Toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        Toast.error("Login failed. An unexpected error occurred.");
      }
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.containerLoginBox}>
          <View>
            <ToastManager position="bottom" duration={3000} />
            <Text style={styles.title}>Inicia Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                value={currentUser.email}
                onChangeText={(text) => inputChange("email", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#666"
                secureTextEntry={true}
                value={currentUser.pswd}
                onChangeText={(text) => inputChange("pswd", text)}
            />
            <Button title="Iniciar sesión" onPress={() => handleLogin()} />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No te has registrado?</Text>
            <Button
                title="Registrarse"
                onPress={() => router.navigate("/user/login_register")}
            />
          </View>
        </View>
      </View>
  );
};

export default loginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ADD8E6",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerLoginBox: {
    backgroundColor: "lightgrey",
    padding: 40,
    borderRadius: 20,
    width: "80%",
  },
  title: {
    fontSize: 25,
    marginBottom: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#87cefa80",
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    color: "#333",
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    marginBottom: 10,
    color: "#333",
  },
});