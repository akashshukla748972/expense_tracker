import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { uploadFileToCloudinary } from "../services/imageService";

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
        "https://expense-tracker-x1po.onrender.com/api/auth/register",
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
        "https://expense-tracker-x1po.onrender.com/api/auth/login",
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

  const updateUser = async (formData, user_id) => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (typeof formData.image == "object") {
        const response = await uploadFileToCloudinary(
          formData.image,
          "expense_tracker/user/"
        );

        delete formData.image;
        formData.avatar = {
          public_id: response?.avatar.public_id,
          url: response?.avatar?.url,
        };
      }

      if (!typeof formData.image == "object") {
        delete formData.image;
      }
      const res = await axios.put(
        `https://expense-tracker-x1po.onrender.com/api/user/update/${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = res.data?.data;
      setUser(userData);
      await SecureStore.setItemAsync("user", JSON.stringify(userData));

      router.back();
      return;
    } catch (error) {
      console.log(error);
      console.log(axios.isAxiosError(error));
    }
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
