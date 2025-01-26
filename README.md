# PGL-Ale-PortFolio

## Descripción

Esta aplicación es un portfolio personal que muestra diferentes pantallas implementadas con React Native y Expo. A continuación, se describen las pantallas principales de la aplicación y cómo se han implementado.

## Pantallas

### 1. Pantalla de Bienvenida

**Ruta:** `app/(drawer)/welcome/index.tsx`

**Descripción:** Esta pantalla da la bienvenida al usuario cuando inicia la aplicación, si previamente se ha registrado y logeado correctamente.

**Implementación:**
```typescript
import React from "react";
import { View, Text } from "react-native";

const WelcomePage = () => {
  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};

export default WelcomePage;
```

### 2. Pantalla de Tienda

**Ruta:** `app/(drawer)/todo/index.tsx`

**Descripción:** Esta pantalla muestra una lista o carrito de la compra, .

**Implementación:**
```typescript
import React from "react";
import { View, Text } from "react-native";

const StoreScreen = () => {
  return (
    <View>
      <Text>Store</Text>
    </View>
  );
};

export default StoreScreen;
```

### 3. Pantalla de Perfil

**Ruta:** `app/(drawer)/profile/_layout.tsx`

**Descripción:** Esta pantalla muestra la información del perfil del usuario y contiene pestañas que muestran mis hobbies y un código QR que nos lleva a mi perfil de Github.

**Implementación:**
```typescript
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import Entypo from "@expo/vector-icons/Entypo";

const TabsLayout = () => {
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

export default TabsLayout;

const styles = StyleSheet.create({});
```

### 4. Pantalla de datos sobre Perros

**Ruta:** `app/(drawer)/dogs/index.tsx`

**Descripción:** Esta pantalla muestra información y datos curiosos sobre perros.

**Implementación:**
```typescript
import React from "react";
import { View, Text } from "react-native";

const DogsScreen = () => {
  return (
    <View>
      <Text>Dogs Facts</Text>
    </View>
  );
};

export default DogsScreen;
```

### 5. Pantalla de Inicio de Sesión

**Ruta:** `app/user/login.tsx`

**Descripción:** Esta pantalla permite al usuario iniciar sesión en la aplicación.

**Implementación:**
```typescript
import React from "react";
import { View, Text } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
```

## Navegación

La navegación entre las pantallas se maneja utilizando `Drawer.Navigator` y `Tabs` de `expo-router`.

**Implementación del Layout Principal:**
```typescript
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { asyncStorageService } from "../../service/async-storage-service";
import HomeScreen from "./welcome/index";
import StoreScreen from "./todo/index";
import TabsLayout from "./profile/_layout";
import DogsScreen from "./dogs/index";
import LoginScreen from "../user/login";

const Drawer = createDrawerNavigator();

const AppLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const userToken = await asyncStorageService.get(
                asyncStorageService.KEYS.userToken
            );
            setIsLoggedIn(userToken != null);
        };

        checkLogin();
    }, []);

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {isLoggedIn ? (
                <Drawer.Navigator>
                    <Drawer.Screen
                        name="home"
                        component={HomeScreen}
                        options={{
                            drawerLabel: "Home",
                            title: "Welcome",
                        }}
                    />
                    <Drawer.Screen
                        name="todo/index"
                        component={StoreScreen}
                        options={{
                            drawerLabel: "Store",
                            title: "My Store",
                        }}
                    />
                    <Drawer.Screen
                        name="profile"
                        component={TabsLayout}
                        options={{
                            drawerLabel: "Profile",
                            title: "About Me",
                        }}
                    />
                    <Drawer.Screen
                        name="dogs/index"
                        component={DogsScreen}
                        options={{
                            drawerLabel: "Dogs",
                            title: "Dogs Facts",
                        }}
                    />
                </Drawer.Navigator>
            ) : (
                <LoginScreen />
            )}
        </GestureHandlerRootView>
    );
};

export default AppLayout;

const styles = StyleSheet.create({});
```

