import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  // console.warn(id);
  return (
    <View>
      <Stack.Screen options={{ title: `Details Header ID: ${id}` }} />
      <Text style={{ fontSize: 20 }}>productDetailsScreen id : {id}</Text>
    </View>
  );
};

export default productDetailsScreen;
