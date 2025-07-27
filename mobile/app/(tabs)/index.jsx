import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import ScreenWrapper from "../../components/ScreenWrapper";

const Index = () => {
  const router = useRouter();
  const { user } = useAuth();

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/(auth)/welcome");
  };

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user]);
  return (
    <ScreenWrapper>
      <Text>Welcome {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({});
