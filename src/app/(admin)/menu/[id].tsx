import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import Button from "../../../components/Button";
import { PizzaSize } from "../../../types";
import products from "../../../../assets/data/products";
import { defaultPizzaImage } from "@/constants/Images";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${product.name}` || "Product Details",
          headerRight: () => (
            <Link
              href={
                `/(admin)/menu/create?id=${id}` as `/(admin)/menu/create?id=${number}`
              }
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.nameText}>{product.name}:</Text>
      <Text style={styles.price}>${product?.price.toFixed(2) || "0.00"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  nameText: {
    fontSize: 20,
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
