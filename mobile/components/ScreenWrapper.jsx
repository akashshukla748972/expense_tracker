import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }) => {
  const paddingTop = Platform.OS == "android" ? 50 : height * 0.06;
  return (
    <View
      style={[
        {
          paddingTop,
        },
      ]}
      className="flex-1 bg-[#171717]"
    >
      <StatusBar barStyle={"light"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
