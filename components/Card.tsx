import { Text, StyleSheet, ScrollView, Image } from "react-native";

export type CardProp = {
  paragraph: string;
};

const ListCard = ({ paragraph }: CardProp) => {
  return (
    <ScrollView>
      <Text style={styles.thingsThatILiked}>{paragraph} </Text>
    </ScrollView>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  thingsThatILiked: {
    borderWidth: 1,
    borderStyle: "dashed",
    padding: 20,
    color: "#34b4eb",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
    backgroundColor: "sylver",
  },
});
