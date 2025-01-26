import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LIGHT_COLOR } from "./colors";

export const Header = () => {
  return (
    <View style={styles.descriptionContainer}>
      <Image
        style={styles.avatar}
        source={require("../assets/images/Alito.gif")}
      ></Image>
      <View style={styles.paragraphContainer}>
        <Text style={styles.title}>Descripción sobre mí!</Text>
        <Text>
          Soy un estudiante de 2ºDAM que le gusta lo que hace y aficionado al tenis, me gusta
          pasar tiempo con la gente que quiero y las actividades al aire libre!
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  descriptionContainer: {
    alignItems: "center",
  },
  paragraphContainer: {
    margin: 10,
    marginBottom: 60,
    backgroundColor: LIGHT_COLOR.descriptionHeader,
    padding: 10,
    borderRadius: 10,
    width: "70%",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
});
