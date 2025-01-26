import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { initialProducts } from "../../../data/initial-products";
import ProductComponent from "../../../components/ProductComponent";
import { getDefaultProduct, Product } from "../../../types/Product";
import uuid from "react-native-uuid";

export const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [currentProduct, setCurrentProduct] = useState<Product>(
    getDefaultProduct()
  );
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleAddOrEditProduct = () => {
    if (
      !currentProduct.name ||
      !currentProduct.category ||
      !currentProduct.price ||
      !currentProduct.quantity
    ) {
      Alert.alert("Faltan campos por rellenar");
      return;
    }

    if (productToEdit) {
      setProductList(
        productList.map((product) =>
          product.id == productToEdit.id
            ? { ...productToEdit, ...currentProduct }
            : product
        )
      );
    } else {
      const newProduct: Product = {
        ...currentProduct,
        id: uuid.v4().toString(),
      };
      setProductList([...productList, newProduct]);
    }

    setIsModalVisible(false);
    setCurrentProduct(getDefaultProduct);
    setProductToEdit(null);
  };

  const inputChange = (name: string, value: string) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const addInCar = (product: Product) => {
    if (product.isInCar == false) {
      const totalValue = product.price * product.quantity;
      setTotalPrice(totalPrice + totalValue);
      product.isInCar = true;
    }
  };

  const quitOutFromCar = (product: Product) => {
    if (product.isInCar == true) {
      const totalValue = product.price * product.quantity;
      setTotalPrice(totalPrice - totalValue);
      product.isInCar = false;
    }
  };

  const deleteProduct = (id: string) => {
    setProductList(productList.filter((item) => item.id != id));
  };

  const deleteAllProducts = () => {
    setProductList([]);
  };

  const editProduct = (product: Product) => {
    setProductToEdit(product);
    setCurrentProduct({ ...product });
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Total:</Text>
        <Text style={styles.text}>
          <AntDesign name="shoppingcart" size={24} color="white" />
          <Text> {totalPrice} €</Text>
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {productList.length == 0 ? (
          <Text style={styles.emptyListText}>La lista está vacía</Text>
        ) : (
          productList.map((product: Product) => (
            <ProductComponent
              key={product.id}
              product={product}
              deleteProduct={() => deleteProduct(product.id)}
              editProduct={() => editProduct(product)}
              addInCar={() => addInCar(product)}
              quitOutFromCar={() => quitOutFromCar(product)}
            />
          ))
        )}
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          title="Añadir producto"
          onPress={() => setIsModalVisible(true)}
          color="#4CAF50"
        />
        <Button
          title="Eliminar productos"
          onPress={() => deleteAllProducts()}
          color="#F44336"
        />
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {productToEdit ? "Editar producto" : "Introduce un nuevo producto"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            placeholderTextColor="#3F51B5"
            value={currentProduct.name}
            onChangeText={(text) => inputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría del producto"
            placeholderTextColor="#3F51B5"
            value={currentProduct.category}
            onChangeText={(text) => inputChange("category", text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cantidad"
            placeholderTextColor="#3F51B5"
            value={currentProduct.quantity.toString()}
            onChangeText={(text) => inputChange("quantity", text)}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Precio"
            placeholderTextColor="#3F51B5"
            value={currentProduct.price.toString()}
            onChangeText={(text) => inputChange("price", text)}
          />
          <Button
            title={productToEdit ? "Actualizar" : "Guardar"}
            onPress={() => handleAddOrEditProduct()}
            color="#2196F3"
          />
        </View>
      </Modal>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3F51B5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  emptyListText: {
    textAlign: "center",
    color: "#757575",
    fontSize: 18,
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#3F51B5",
    borderWidth: 1,
  },
});