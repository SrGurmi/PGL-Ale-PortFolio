import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const gitPage = () => {
  return (
    <View style={styles.qrContainer}>
      <Text style={{ backgroundColor: "none" }}>Mi repositorio</Text>
      <QRCode
        value="https://github.com/SrGurmi"
        logo={require("../../../assets/images/Alito.gif")}
        logoSize={10}
        logoBackgroundColor="transparent"
      />
    </View>
  );
};

export default gitPage;

const styles = StyleSheet.create({
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
});
