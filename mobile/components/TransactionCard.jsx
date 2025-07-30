import { Modal, StyleSheet, Text, View } from "react-native";
import * as Icons from "phosphor-react-native";

const TransactionCard = ({ item, modelVisible, setModelVisible }) => {
  console.log("hellor");
  return (
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
          <Text className="text-[#ccc]">Hello</Text>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
