// RootLayout.jsx
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/authContext";
import { AuthLoader } from "../components/AuthLoader";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLoader>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthLoader>
    </AuthProvider>
  );
}
