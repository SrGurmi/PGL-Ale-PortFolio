import { Text, ScrollView, Image, StyleSheet, View } from "react-native";
import { Product } from "../types/Product";
import Entypo from "@expo/vector-icons/Entypo";

export type ProductProp = {
  product: Product;
  deleteProduct: Function;
  editProduct: Function;
  addInCar: Function;
  quitOutFromCar: Function;
};

const ProductComponent = ({
                            product,
                            deleteProduct,
                            editProduct,
                            addInCar,
                            quitOutFromCar,
                          }: ProductProp) => {
  const getImageFromCategory = () => {
    switch (product.category.toLowerCase()) {
      case "carnicería":
        return require("../assets/images/carne.png");
      case "frutería":
        return require("../assets/images/fruta.png");
      case "panadería":
        return require("../assets/images/pan.png");
      case "bebidas":
        return require("../assets/images/bebidas.png");
      case "pescadería":
        return require("../assets/images/pescado.png");
      case "enlatados":
        return require("../assets/images/enlatados.png");
      default:
        return require("../assets/images/otros.png");
    }
  };

  return (
      <ScrollView style={styles.listProducts}>
        <View style={styles.container}>
          <Image source={getImageFromCategory()} style={styles.image}></Image>
          <Text style={styles.text}>Nombre del producto: {product.name}</Text>
          <Text style={styles.text}>Categoría del producto: {product.category}</Text>
          <Text style={styles.text}>Cantidad del producto: {product.quantity}</Text>
          <Text style={styles.text}>Precio del producto: {product.price} €</Text>
          <Text style={styles.text}>
            Esta en el carrito:{" "}
            {product.isInCar == true ? (
                <Entypo name="check" size={24} color="green" />
            ) : (
                <Entypo name="cross" size={24} color="red" />
            )}
          </Text>
          <View style={styles.productsController}>
            <Entypo
                name="edit"
                size={30}
                color="dark"
                onPress={() => editProduct()}
            />
            <Entypo
                name="plus"
                size={30}
                color="green"
                onPress={() => addInCar()}
            />
            <Entypo
                name="minus"
                size={30}
                color="orange"
                onPress={() => quitOutFromCar()}
            />
            <Entypo
                name="trash"
                size={30}
                color="red"
                onPress={() => deleteProduct()}
            />
          </View>
        </View>
      </ScrollView>
  );
};

export default ProductComponent;

const styles = StyleSheet.create({
  listProducts: {
    display: "flex",
    paddingTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  productsController: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderColor: "#3F51B5",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
  },
});