import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Loading from "./Loading";

const Button = ({ onPress, loading = false, children, styleSheet }) => {
  if (loading) {
    return (
      <View
        style={{ backgroundColor: "#a3e635", width: "100%" }}
        className="p-7 rounded-xl"
      >
        {/* loading */}
        <Loading color="#fff" />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full bg-[#a3e635] rounded-lg justify-center items-center p-[15px] ${styleSheet}`}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#a3e635",
    borderRadius: 10,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
  },
});
