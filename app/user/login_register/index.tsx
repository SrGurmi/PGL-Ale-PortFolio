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

export const registerPage = () => {
  const [currentUser, setCurrentUser] = useState<User>(getDefaultUser());

  const inputChange = (name: string, value: string) => {
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleLogin = async () => { // ✅ Function name should be handleRegister (for clarity)
    if (
        !currentUser.email.includes("@") ||
        (!currentUser.email.endsWith(".com") &&
            !currentUser.email.endsWith(".net"))
    ) {
      Toast.error("The email format is not correct");
    } else if (currentUser.pswd.length < 8) {
      Toast.error("The password format is not correct");
    } else {
      try { // ✅ Add try-catch for error handling
        const token = await LoginService.registerUser({
          fullname: currentUser.fullname,
          email: currentUser.email,
          pswd: currentUser.pswd, // ✅ Verifying pswd is passed
        });
        console.log("Registration token response:", token); // Log registration token

        if (token != null) {
          router.navigate("/user/login"); // Redirect to login on successful registration
        } else {
          Toast.error("The user already exists or registration failed.");
        }
      } catch (error) { // ✅ Handle registration errors
        console.error("Error during registration:", error);
        Toast.error("Registration failed. An unexpected error occurred.");
      }
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.containerLoginBox}>
          <View>
            <ToastManager position="bottom" />
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#666"
                value={currentUser.fullname}
                onChangeText={(text) => inputChange("fullname", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#666"
                value={currentUser.email}
                onChangeText={(text) => inputChange("email", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#666"
                secureTextEntry={true}
                value={currentUser.pswd} // ✅ Verifying pswd is passed
                onChangeText={(text) => inputChange("pswd", text)}
            />
            <Button title="Registrarse" onPress={() => handleLogin()} /> {/* ✅ onPress calls handleLogin (which is actually handleRegister logic) */}
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
            <Button
                title="Iniciar sesión"
                onPress={() => router.navigate("/user/login")}
            />
          </View>
        </View>
      </View>
  );
};

export default registerPage;

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