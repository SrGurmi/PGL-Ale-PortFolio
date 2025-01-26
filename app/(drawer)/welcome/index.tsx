import { Link, router } from "expo-router";
import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { LIGHT_COLOR } from "../../../components/colors";
import { asyncStorageService } from "../../../service/async-storage-service";
import { Audio } from "expo-av";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const welcomePage = () => {
  const ballPosition = useSharedValue(0);
  const racketPosition = useSharedValue(0);
  const sound = useRef<Audio.Sound | null>(null);

  const handleLogOut = async () => {
    await asyncStorageService.remove(asyncStorageService.KEYS.userToken);
    router.navigate("/user/login");
  };

  const playSound = async () => {
    if (!sound.current) {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
          require("../../../assets/sounds/tennis-hit.mp3")
      );
      sound.current = loadedSound;
    }
    await sound.current?.replayAsync();
  };

  const startAnimation = () => {
    ballPosition.value = withTiming(100, { duration: 500 }, () => {
      ballPosition.value = withTiming(0, { duration: 500 });
    });

    racketPosition.value = withTiming(-30, { duration: 350 }, () => {
      racketPosition.value = withTiming(0, { duration: 350 });
    });

    playSound();
  };

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ballPosition.value }],
  }));

  const racketStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: racketPosition.value }],
  }));

  return (
      <ImageBackground
          source={require("../../../assets/images/minimalist-background.jpg")}
          style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}> Bienvenido a mi app!</Text>
          <TouchableOpacity style={styles.buttonHeader} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={startAnimation}>
          <View style={styles.container}>
            <Animated.View style={[styles.ball, ballStyle]} />
            <Animated.View style={[styles.racket, racketStyle]} />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
  );
};

export default welcomePage;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: LIGHT_COLOR.titleWelcome,
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  buttonHeader: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: LIGHT_COLOR.buttonWelcome,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    padding: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ball: {
    width: 30,
    height: 30,
    backgroundColor: "yellow",
    borderRadius: 15,
    position: "absolute",
  },
  racket: {
    width: 100,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
  },
});
