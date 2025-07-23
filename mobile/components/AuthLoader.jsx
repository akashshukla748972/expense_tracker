// components/AuthLoader.jsx
import { useAuth } from "../contexts/authContext";
import { View, ActivityIndicator } from "react-native";
import React from "react";

export const AuthLoader = ({ children }) => {
  const { authLoading } = useAuth();

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};
