import { createContext, useContext } from "react";
import { Axios } from "../services/Axios";
import { router } from "expo-router";
import { uploadFileToCloudinary } from "../services/imageService";

export const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be wrapped inside WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const handleCreateWallet = async (formData) => {
    try {
      // ✅ Upload to Cloudinary if image is an object
      if (typeof formData.image === "object") {
        const response = await uploadFileToCloudinary(
          formData.image,
          "expense_tracker/wallet/"
        );

        delete formData.image;
        formData.avatar = {
          public_id: response?.avatar?.public_id,
          url: response?.avatar?.url,
        };
      }

      // ✅ Remove image key if it's not an object
      if (typeof formData.image !== "object") {
        delete formData.image;
      }

      // ✅ Send to backend
      const res = await Axios.post("/wallet/create", formData);

      if (res.status === 201) {
        router.push("/(tabs)/wallet"); // Correct navigation
      }

      console.log("Wallet Created:", res.data);
    } catch (error) {
      console.log(
        "Create Wallet Error:",
        error?.response?.data || error.message
      );
    }
  };

  const handleUpdateWallet = async (formData, wallet_id) => {
    try {
      // ✅ Upload to Cloudinary if image is an object
      if (typeof formData.image === "object") {
        const response = await uploadFileToCloudinary(
          formData.image,
          "expense_tracker/wallet/"
        );

        delete formData.image;
        formData.avatar = {
          public_id: response?.avatar?.public_id,
          url: response?.avatar?.url,
        };
      }

      // ✅ Remove image key if it's not an object
      if (typeof formData.image !== "object") {
        delete formData.image;
      }

      // ✅ Send to backend
      const res = await Axios.put(`/wallet/update/${wallet_id}`, formData);

      if (res.status === 200) {
        router.push("/(tabs)/wallet"); // Correct navigation
      }

      console.log("Wallet Created:", res.data);
    } catch (error) {
      console.log(
        "Create Wallet Error:",
        error?.response?.data || error.message
      );
    }
  };

  const handleDeleteWallet = async (wallet_id) => {
    try {
      // ✅ Send to backend
      const res = await Axios.delete(`/wallet/delete/${wallet_id}`);

      if (res.status === 200) {
        router.push("/(tabs)/wallet"); // Correct navigation
      }

      console.log("Wallet Created:", res.data);
    } catch (error) {
      console.log(
        "Create Wallet Error:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <WalletContext.Provider
      value={{ handleCreateWallet, handleUpdateWallet, handleDeleteWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
