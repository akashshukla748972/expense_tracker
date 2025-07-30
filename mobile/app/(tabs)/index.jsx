import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import * as Icons from "phosphor-react-native";
import HomeCard from "../../components/HomeCard";
import TransactionList from "../../components/TransactionList";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import useFetchTransaction from "../../hooks/useFetchTransaction";
import { useAuth } from "../../contexts/authContext";
import useFetch from "../../hooks/useFetch";

const Index = () => {
  const router = useRouter();
  const { data, loading } = useFetchTransaction();
  const { user } = useAuth();
  return (
    <ScreenWrapper>
      <View className="flex-1 px-[20px] mt-2">
        {/* header */}
        <View className="flex flex-row justify-between items-center mb-[10px]">
          <View className="gap-1">
            <Text className="text-[#ccc] text-[16px] font-medium opacity-70">
              Hey,
            </Text>
            <Text className="text-[#ccc] text-[20px] font-semibold">
              {user?.name}
            </Text>
          </View>

          <TouchableOpacity className="p-[10px] bg-[#404040] rounded-full">
            <Icons.MagnifyingGlassIcon size={22} color="#ccc" weight="bold" />
          </TouchableOpacity>
        </View>

        {/*  */}
        <ScrollView
          contentContainerStyle={styles.scollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* card */}
          <View>
            <HomeCard />
          </View>

          {/* transaction */}
          <TransactionList
            title="Recent Transactions"
            data={data}
            loading={loading}
            emptyListMessage={"No transaction added yet!"}
          />
        </ScrollView>

        <TouchableOpacity
          className="w-[50px] h-[50px] flex justify-center items-center rounded-full
           absolute  bg-[#a3e635] bottom-[30px] right-[30px]"
          onPress={() => router.push("/(models)/transactionModel")}
        >
          <Icons.Plus size={24} color="#000" weight="bold" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({
  scollViewStyle: {},
});
