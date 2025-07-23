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
      try {
        const token = await SecureStore.getItemAsync("token");
        const userData = await SecureStore.getItemAsync("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error loading user from storage", error);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const registerUser = async (formData) => {
    try {
      const res = await axios.post(
        "https://expense-tracker-2s7v.onrender.com/api/auth/register",
        formData
      );

      const userData = res.data?.data;
      const token = res.data?.token;

      setUser(userData);
      await SecureStore.setItemAsync("user", JSON.stringify(userData));
      await SecureStore.setItemAsync("token", token);

      router.replace("/(tabs)");
      return {
        isSuccess: true,
        message: "Login successful",
      };
    } catch (error) {
      let err = "Something went wrong";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          err = "Invalid details provided.";
        } else if (error.response?.status === 500) {
          err = "Server error. Try again later.";
        }
      }

      return {
        isSuccess: false,
        message: err,
      };
    }
  };

  const loginUser = async (formData) => {
    try {
      const res = await axios.post(
        "https://expense-tracker-2s7v.onrender.com/api/auth/login",
        formData
      );

      const userData = res.data?.data;
      const token = res.data?.token;

      setUser(userData);
      await SecureStore.setItemAsync("user", JSON.stringify(userData));
      await SecureStore.setItemAsync("token", token);

      router.replace("/(tabs)");
      return {
        isSuccess: true,
        message: "Login successful",
      };
    } catch (error) {
      let err = "Something went wrong";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          err = "Invalid username or password.";
        } else if (error.response?.status === 500) {
          err = "Server error. Try again later.";
        }
      }

      return {
        isSuccess: false,
        message: err,
      };
    }
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    router.replace("/(auth)/welcome");
  };

  const updateUser = (formData) => {
    // Future implementation
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        setAuthLoading,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
