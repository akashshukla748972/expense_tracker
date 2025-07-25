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

const profileModel = () => {
  const { user, setUser, updateUser } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.avatar?.url || null,
    });
  }, [user]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    const { name, image } = userData;
    if (!name.trim()) {
      Alert.alert("User", "User name is required!");
      return;
    }
    setLoading(true);
    try {
      const res = await updateUser(userData, user._id);
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
          title="Update Profile"
          leftIcon={<BackButton />}
          style={"mb-[10px]"}
        />

        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          {/* avatar container */}
          <View className="relative self-center">
            <Image
              className="self-center bg-[#d4d4d4] h-[135px] w-[135px] rounded-full border-[1px] border-[#737373]"
              source={
                userData.image?.uri
                  ? { uri: userData?.image?.uri }
                  : user?.avatar.url
                    ? { uri: user.avatar.url }
                    : require("../../assets/images/defaultAvatar.png")
              }
            />
            <TouchableOpacity
              onPress={onPickImage}
              className="absolute bottom-1 right-[7px] rounded-full bg-[#f5f5f5]"
              style={styles.editIcon}
            >
              <Icon.Pencil size={20} color="#171717" />
            </TouchableOpacity>
          </View>

          {/* input container */}
          <View className="gap-[10px]">
            <Text className="text-md font-semibold text-[#ccc]">Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={"#ccc"}
              value={userData.name}
              onChangeText={(value) =>
                setUserData({ ...userData, name: value })
              }
              className="text-white text-[17px] border border-[#ccc] px-2 py-3 rounded-xl"
            />
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
          <Text className="text-[#fff]">Update</Text>
        </Button>
      </View>
    </ModelWrapper>
  );
};

export default profileModel;

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
