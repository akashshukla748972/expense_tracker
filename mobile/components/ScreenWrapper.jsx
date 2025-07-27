import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style = "bg-[#171717]", children }) => {
  const paddingTop = Platform.OS == "android" ? 50 : height * 0.06;
  return (
    <View
      style={[
        {
          paddingTop,
        },
      ]}
      className={`flex-1 ${style}`}
    >
      <StatusBar barStyle={"light"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
