import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Button from "../../components/Button";
import ScreenWrapper from "../../components/ScreenWrapper";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-between">
        {/* login button */}
        <View>
          <TouchableOpacity className="self-end mr-4">
            <Text className="text-white text-xl font-semibold opacity-80">
              Sign In
            </Text>
          </TouchableOpacity>

          {/* welcome image */}
          <Animated.Image
            entering={FadeIn.duration(1000)}
            className="w-[100%] h-82 self-center mt-32"
            resizeMode="contain"
            source={require("../../assets/images/welcome.png")}
          />
        </View>

        {/* footer */}
        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(100)
            .springify()
            .damping(12)}
          className="bg-[#171717] pt-15 pb-10 gap-4"
          style={styles.footer}
        >
          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            className="items-center p-2 opacity-90"
          >
            <Text className="text-3xl font-medium text-[#fff]">
              Always take control
            </Text>
            <Text className="text-3xl font-medium text-[#fff]">
              of your finances
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(12)}
            className="items-center gap-1 opacity-60"
          >
            <Text className="text-base font-medium text-[#e5e5e5]">
              Finances must be arranged to set a better
            </Text>
            <Text className="text-base font-medium text-[#e5e5e5]">
              lifestyle in feature
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(300)
              .springify()
              .damping(12)}
            className="w-[100%] px-[20px]"
          >
            <Button loading={false}>
              <Text className="text-[#fff] font-semibold text-xl">
                Get Started
              </Text>
            </Button>
          </Animated.View>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  footer: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
});
