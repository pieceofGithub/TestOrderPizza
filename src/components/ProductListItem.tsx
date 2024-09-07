import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { useRouter, Href, useSegments } from "expo-router";
import { defaultPizzaImage } from "@/constants/Images";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const router = useRouter();
  const segments = useSegments();
  // console.log(segments);

  const handlePress = () => {
    router.push(
      `/${segments[0]}/menu/${product.id}` as Href<`/${string}/menu/${number}`>
    );
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </Pressable>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    flex: 1,
    maxWidth: "50%",
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
