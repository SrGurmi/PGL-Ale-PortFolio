import { Tabs } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Header";
import { cards } from "../../../components/Cards";
import ListCard, { CardProp } from "../../../components/Card";

export const hobbiesPage = () => {
  return (
    <>
      <Text style={styles.subTitle}>Cosas que me gustan:</Text>
      <ScrollView style={styles.thingsContainer}>
        {cards.map((card: CardProp, id: number) => (
          <ListCard key={id} paragraph={card.paragraph} />
        ))}
      </ScrollView>
    </>
  );
};

export default hobbiesPage;

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "900",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
  },
  thingsContainer: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 50,
    marginLeft: 0,
    marginRight: 0,
    width: "auto",
  },
});
