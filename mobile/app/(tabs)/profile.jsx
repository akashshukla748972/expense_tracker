import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../contexts/authContext";
import { getProfileImage } from "../../services/imageService";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Icon from "phosphor-react-native";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const accountOptions = [
    {
      title: "Edit Profile",
      icon: <Icon.User size={26} color="white" weight="fill" />,
      routeName: "/(models)/profileModel",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icon.GearSix size={26} color="white" weight="fill" />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icon.Lock size={26} color="white" weight="fill" />,
      bgColor: "#525252",
    },
    {
      title: "Logout",
      icon: <Icon.Power size={26} color="white" weight="fill" />,
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = async () => {
    await logoutUser();
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure want to logout?", [
      {
        text: "Concel",
        onPress: () => console.log("cancel logout"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const handlePress = (item) => {
    if (item.title == "Logout") {
      showLogoutAlert();
    }
    if (item.title == "Edit Profile") {
      router.push(item.routeName);
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex-1 px-5">
        {/* header */}
        <Header title="Profile" leftIcon={<BackButton />} style={""} />

        {/* user info */}
        <View className="mt-[30px] items-center gap-2">
          {/* avatar */}
          <View className="mt-[30px] items-center gap-y-4">
            {/* user iamge */}
            <Animated.Image
              entering={FadeInDown.duration(1000)
                .delay(100)
                .springify()
                .damping(12)}
              source={
                user?.avatar?.url
                  ? {
                      uri: getProfileImage(user?.avatar?.url),
                    }
                  : require("../../assets/images/defaultAvatar.png")
              }
              className="self-center bg-[#d4d4d4] h-[135px] w-[135px] rounded-[200px]"
              resizeMode="cover"
            />
          </View>
          {/* name & email */}
          <View className="gap-y-1 items-center">
            <Text className="text-[24px] font-[600] text-[#f5f5f5]">
              {user?.name}
            </Text>
            <Text className="text-[15px] font-[600] text-[#a3a3a3]">
              {user?.email}
            </Text>
          </View>
        </View>
        {/* account options */}
        <View className="mt-[35px]">
          {accountOptions.map((item, index) => (
            <Animated.View
              entering={FadeInDown.duration(500)
                .delay(index * 50)
                .springify()
                .damping(12)}
              key={item.title}
              className="mb-[17px]"
            >
              <TouchableOpacity
                onPress={() => handlePress(item)}
                className="flex-row items-center gap-x-[10px]"
              >
                {/* icon */}
                <View
                  className="h-[44px] w-[44px] items-center justify-center rounded-xl"
                  style={{
                    borderCurve: "continuous",
                    backgroundColor: item.bgColor,
                  }}
                >
                  {item.icon && item.icon}
                </View>
                <Text className="text-[16px] font-semibold text-[#ccc] flex-1">
                  {item.title}
                </Text>
                <Icon.CaretRight size={20} weight="bold" color="#ccc" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
