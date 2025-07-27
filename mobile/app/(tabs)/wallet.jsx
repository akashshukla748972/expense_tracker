import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import * as Icons from "phosphor-react-native";
import { useRouter } from "expo-router";
import WalletItem from "../../components/WalletItem";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const Wallet = () => {
  const { data, loading } = useFetch();

  const router = useRouter();
  const getTotalBalance = () =>
    data.reduce((total, item) => {
      total = total + parseInt(item.amount) || 0;
      return total;
    }, 0);
  return (
    <ScreenWrapper style="bg-black">
      <View className="flex-1 justify-between">
        {/* balance view */}
        <View className="h-[160px] bg-black justify-center items-center">
          <View className="items-center">
            <Text className="text-[#ccc] font-semibold text-[45px]">
              ${getTotalBalance().toFixed(2)}
            </Text>
            <Text className="text[16px] text-[#ccc] opacity-70">
              Total Balance
            </Text>
          </View>
        </View>

        {/* wallet */}
        <View className="flex-1 bg-[#171717] rounded-t-[30px] p-[20px] pt-[25px]">
          {/* header */}
          <View className="flex flex-row justify-between items-center mb-[10px]">
            <Text className="text-[#ccc] text-lg font-medium">My Wallets</Text>
            <TouchableOpacity
              onPress={() => router.push("/(models)/walletModel")}
              className=""
            >
              <Icons.PlusCircle size={30} color="#a3e635" weight="fill" />
            </TouchableOpacity>
          </View>

          {/* todo: wallet list */}
          <View className="flex flex-row justify-between items-center mb-[10px]">
            {/* <Text className="text-[#ccc] text-lg font-medium">My Wallets</Text>
            <TouchableOpacity
              className=""
            >
              <Icons.PlusCircle size={30} color="#a3e635" weight="fill" />
            </TouchableOpacity> */}
          </View>

          {loading && <Loading />}

          <View>
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return <WalletItem item={item} index={index} router={router} />;
              }}
              contentContainerStyle={styles.listSyle}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  listSyle: {
    paddingVertical: 25,
    paddingTop: 15,
  },
});
