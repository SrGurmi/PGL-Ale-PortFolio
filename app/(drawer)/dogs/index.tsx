import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { dogService } from "../../../service/dogService";

const DogsPage = () => {
  const [dogImage, setDogImage] = useState<string>(
    dogService.SUPER_DOG_IMG_URL
  );
  const [fact, setFact] = useState<string>("Nothing to show yet.");

  const loadDogData = async () => {
    const fact = await dogService.getDogFact();
    setFact(fact);

    const imgUrl = await dogService.getDogImageUrl();
    setDogImage(imgUrl);
  };

  useEffect(() => {
    loadDogData();
  }, []);

  return (
    <View>
      <Image
        source={{ uri: dogImage }}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      <Text>{fact}</Text>
      <Button title="Buscar nuevo facto" onPress={loadDogData} />
    </View>
  );
};

export default DogsPage;

const styles = StyleSheet.create({});
