import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ModelWrapper = ({ style, children, bg = "bg-[#262626]" }) => {
  return (
    <View className={`flex-1 pt-[50px] pb-[10px] ${bg} ${style && style}`}>
      {children}
    </View>
  );
};

export default ModelWrapper;

const styles = StyleSheet.create({});
