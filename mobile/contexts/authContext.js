import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside authProvider.");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = await SecureStore.getItemAsync("token");
      console.log("token->", token);
      if (token) {
        setUser({ name: "Akash Shukla" });
      }
      setAuthLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const registerUser = async (formData) => {
    try {
      const res = await axios.post(
        "https://expense-tracker-2s7v.onrender.com/api/auth/register",
        formData
      );
      setUser({ name: "Akash Shukla" });
      await SecureStore.setItemAsync("token", res.data?.token);
      router.replace("/(tabs)");
    } catch (error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }
  };

  const loginUser = (formData) => {};

  const updateUser = (formData) => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        setAuthLoading,
        registerUser,
        loginUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
