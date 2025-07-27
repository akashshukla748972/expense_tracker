import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icons from "phosphor-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const WalletItem = ({ item, index, router }) => {
  const openWallet = () => {
    router.push({
      pathname: "/(models)/walletModel",
      params: {
        id: item?._id,
        name: item?.name,
        image: item?.avatar?.url,
      },
    });
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(12)}
    >
      <TouchableOpacity
        className="flex flex-row items-center mb-[17px]"
        onPress={openWallet}
      >
        <View className="h-[45px] w-[45px] border-[1px] border-[#525252] rounded-lg overflow-hidden">
          <Image
            style={{ flex: 1, opacity: 0.7 }}
            resizeMode="cover"
            source={{ uri: item?.avatar?.url }}
          />
        </View>
        <View className="flex-1 gap-[2px] ml-3">
          <Text className="text-lg font-medium text-[#ccc]">{item?.name}</Text>
          <Text className="text-lg font-medium text-[#ccc] opacity-70">
            ${item?.amount}
          </Text>
        </View>

        <Icons.CaretRight size={20} weight="bold" color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({});
