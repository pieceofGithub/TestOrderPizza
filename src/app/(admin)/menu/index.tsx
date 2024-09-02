import { StyleSheet, Image, Text, View, FlatList } from "react-native";
import products from "@assets/data/products";
import Colors from "@/constants/Colors";
import ProductListItem from "@components/ProductListItem";

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        numColumns={3}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
