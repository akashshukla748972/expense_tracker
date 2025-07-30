import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Loading from "../components/Loading";
import { expenseCategories, incomeCategory } from "../constants/data";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import * as Icons from "phosphor-react-native";
import TransactionCard from "./transactionCard";

const TransactionList = ({
  data = [],
  title,
  loading,
  emptyListMessage = "",
}) => {
  return (
    <View className="gap-[17px] mt-4">
      {title && (
        <Text className="text-[20px] font-medium text-[#ccc]">{title}</Text>
      )}

      {!loading && data.length == 0 && (
        <Text className="text-[15px] text-orange-500 text-center mt-15">
          {emptyListMessage}
        </Text>
      )}

      {loading && (
        <View className="top-[100px]">
          <Loading />
        </View>
      )}

      <View className="">
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionItem item={item} index={index} />
          )}
          estimatedItemSize={60}
        />
      </View>
    </View>
  );
};

const TransactionItem = ({ item, index, handleClick }) => {
  const [modelVisible, setModelVisible] = useState(false);
  const category =
    item.type == "expense"
      ? expenseCategories[item?.category || "others"]
      : incomeCategory;
  const IconComponent = category?.icon;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(12)}
    >
      <TouchableOpacity
        onPress={() => setModelVisible(true)}
        className="flex flex-row justify-between items-center gap-3 mb-3 bg-[#262626] p-[10px] rounded-md"
      >
        <View className="flex flex-row gap-4">
          <View
            style={{ backgroundColor: category.bgColor }}
            className="rounded-md p-2"
          >
            {IconComponent && (
              <IconComponent size={25} weight="fill" color="#ccc" />
            )}
          </View>

          <View className="flex gap-[2.5px]">
            <Text className="text-[17px] text-[#ccc]">{category.label}</Text>
            <Text className="text-[17px] text-[#a3a3a3]" numberOfLines={1}>
              {item?.description
                ? `${String(item?.description).slice(0, 16)}...`
                : ""}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text
            className={`${item?.type == "income" ? "text-[#a3e635]" : "text-red-500"} font-medium`}
          >
            Rs.{item?.amount}
          </Text>
          <Text className="text-[#a3a3a3] font-medium text-[13px]">
            {new Date(item?.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modelVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "center",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#00000080] justify-center">
          <View className="bg-[#474747] rounded-l-lg rounded-r-lg p-4 pb-6">
            <View className="flex flex-row justify-end">
              <Icons.X
                onPress={() => setModelVisible(false)}
                name="close-sharp"
                size={24}
                color="#f49b33"
              />
            </View>
            <Text className="text-[#ccc]">{item?.type}</Text>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
