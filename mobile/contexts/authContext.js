import { createContext, useContext, useState } from "react";
import axios from "axios";

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

  const registerUser = async (formData) => {
    try {
      const res = await axios.post(
        "https://expense-tracker-2s7v.onrender.com/api/auth/register",
        formData
      );
      return {
        token: res.data?.token,
        isSuccesss: true,
        message: "User registered successfully.",
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccesss: false,
        message: error.message,
      };
    }
  };

  const loginUser = (formData) => {};

  const updateUser = (formData) => {};

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
