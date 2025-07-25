import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({ title = "", leftIcon, style }) => {
  return (
    <View className={`w-[100%] flex flex-row items-center ${style}`}>
      {leftIcon && <View className={`self-start ${style}`}>{leftIcon}</View>}
      {title && (
        <Text
          className={`text-xl font-semibold text-white text-center bg-red-500}`}
          style={{ width: leftIcon ? "82%" : "100%" }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {},
  leftIcon: {},
});
