// RootLayout.jsx
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/authContext";
import { AuthLoader } from "../components/AuthLoader";
import { View, ActivityIndicator } from "react-native";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(models)/profileModel"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLoader>
        <StackLayout />
      </AuthLoader>
    </AuthProvider>
  );
}
