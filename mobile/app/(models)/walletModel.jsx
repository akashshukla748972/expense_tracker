import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModelWrapper from "../../components/ModelWrapper";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import * as Icon from "phosphor-react-native";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/authContext";
import { Axios } from "../../services/Axios";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "../../components/ImageUpload";
import { useWallet } from "../../contexts/walletContext";
import { useLocalSearchParams } from "expo-router";
import DeleteButton from "../../components/DeleteButton";

const WalletModel = () => {
  const { handleCreateWallet, handleUpdateWallet, handleDeleteWallet } =
    useWallet();
  const [wallet, setWallet] = useState({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const oldWallet = useLocalSearchParams();
  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({
        name: oldWallet?.name,
        image: oldWallet?.image,
      });
    }
  }, []);

  const onSubmit = async () => {
    const { name, image } = wallet;
    if (!name.trim()) {
      Alert.alert("Wallet", "Wallet name is required!");
      return;
    }
    setLoading(true);
    try {
      let res = null;
      if (oldWallet?.id) {
        res = await handleUpdateWallet(wallet, oldWallet?.id);
      } else {
        res = await handleCreateWallet(wallet);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWallet = async () => {
    console.log("hello");
    setLoading(true);
    try {
      const res = await handleDeleteWallet(oldWallet?.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModelWrapper>
      <View className="flex-1 justify-between px-5">
        <Header
          title={oldWallet?.id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
          deleteIcon={
            oldWallet?.id && (
              <DeleteButton
                onDelete={() =>
                  Alert.alert(
                    "Confirm",
                    "Do you want to delete wallet",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Canceled"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: deleteWallet,
                        style: "destructive",
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () => {
                        "No action performed";
                      },
                    }
                  )
                }
              />
            )
          }
          style={"mb-[10px]"}
        />

        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          {/* input container */}
          <View className="flex gap-y-6">
            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">
                Wallet Name
              </Text>
              <TextInput
                placeholder="Enter your wallet"
                placeholderTextColor={"#ccc"}
                value={wallet.name}
                onChangeText={(value) => setWallet({ ...wallet, name: value })}
                className="text-white text-[17px] border border-[#ccc] px-2 py-3 rounded-xl"
              />
            </View>
            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">
                Wallet Icon
              </Text>
              <ImageUpload
                file={wallet.image}
                onSelect={(file) => setWallet({ ...wallet, image: file })}
                onClear={() => setWallet({ ...wallet, image: null })}
                placeholder="Upload Image"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* footer */}
      <View className="items-center flex-row justify-center px-[20px] gap-[12px] py-[25px] border-t-[#404040] border-[1px] mb-[10px]">
        <Button
          loading={loading}
          className=""
          style="flex-1"
          onPress={onSubmit}
        >
          <Text className="text-[#fff]">
            {oldWallet?.id ? "Update Wallet" : "New Wallet"}
          </Text>
        </Button>
      </View>
    </ModelWrapper>
  );
};

export default WalletModel;

const styles = StyleSheet.create({
  form: {
    gap: 30,
    marginTop: 15,
  },
  editIcon: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 7,
  },
});
