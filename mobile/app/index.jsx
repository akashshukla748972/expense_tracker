import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const navigateWlc = setTimeout(() => {
      router.push("/(auth)/welcome");
    }, 2000);
    return () => clearTimeout(navigateWlc);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-[#171717]">
      <Image
        resizeMode="contain"
        style={styles.lego}
        source={require("../assets/images/splashImage.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  lego: {
    height: "20%",
    aspectRatio: 1,
  },
});
