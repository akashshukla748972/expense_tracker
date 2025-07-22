import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loading = ({ size = "large", color = "#a3e635" }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
