import { ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Icons from "phosphor-react-native";
import useFetch from "../hooks/useFetch";

const HomeCard = () => {
  const { data } = useFetch();
  const getTotalBalance = () =>
    data.reduce((total, item) => {
      total = total + parseInt(item.amount) || 0;
      return total;
    }, 0);
  const getTotalExpenses = () =>
    data.reduce((total, item) => {
      total = total + parseInt(item.total_expenses) || 0;
      return total;
    }, 0);
  const getTotalIncome = () =>
    data.reduce((total, item) => {
      total = total + parseInt(item.total_income) || 0;
      return total;
    }, 0);

  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      className="h-[210px] w-full"
    >
      <View className="p-5 px-[23px] max-h-[87%] w-full">
        {/* total balance */}
        <View className="flex flex-row justify-between items-center mb-[5px] ">
          <Text className="text-[#262626] text-[17px] font-semibold">
            Total Balance
          </Text>
          <Icons.DotsThreeOutline color="#000" size={23} weight="fill" />
        </View>

        <Text className="text-[#000] text-[23px] font-bold">
          Rs.{getTotalBalance()}
        </Text>
      </View>

      {/* total expense and income */}
      <View className="flex flex-row justify-between items-center mt-6 px-[23px]">
        {/* incom */}
        <View style={{ gap: 5 }}>
          <View className="flex flex-row items-center gap-[7px] ">
            <View className="">
              <Icons.ArrowDown size={15} color="#000" weight="bold" />
            </View>
            <Text className="text-[16px] text-[#404040] font-medium">
              Income
            </Text>
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text className="text-[17px] text-[#16a34a] font-semibold">
              Rs.{getTotalIncome()}
            </Text>
          </View>
        </View>
        {/* expense */}
        <View style={{ gap: 5 }}>
          <View className="flex flex-row items-center gap-[7px] ">
            <View className="">
              <Icons.ArrowUp size={15} color="#000" weight="bold" />
            </View>
            <Text className="text-[16px] text-[#404040] font-medium">
              Expense
            </Text>
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text className="text-[17px] text-[#ef4444] font-semibold">
              Rs.{getTotalExpenses()}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
