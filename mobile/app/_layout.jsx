// RootLayout.jsx
import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../contexts/authContext";
import { AuthLoader } from "../components/AuthLoader";
import { View, ActivityIndicator } from "react-native";
import { WalletProvider } from "../contexts/walletContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(models)/profileModel"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="(models)/walletModel"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <WalletProvider>
        <AuthLoader>
          <StackLayout />
        </AuthLoader>
      </WalletProvider>
    </AuthProvider>
  );
}
