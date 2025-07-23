import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

const index = () => {
  const router = useRouter();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    const navigate = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/welcome");
      }
    }, 2000);

    return () => clearTimeout(navigate);
  }, [user, authLoading]);

  useEffect(() => {
    console.log("Auth loading:", authLoading);
  }, [authLoading]);

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
