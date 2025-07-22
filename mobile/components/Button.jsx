import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Loading from "./Loading";

const Button = ({ onPress, loading = false, children }) => {
  if (loading) {
    return (
      <View style={{ backgroundColor: "#a3e635" }} className="p-6 rounded-xl">
        {/* loading */}
        <Loading color="#fff" />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a3e635",
    borderRadius: 10,
    borderCurve: "continuous",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
