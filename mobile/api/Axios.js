import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const Axios = axios.create({
  baseURL: "https://expense-tracker-2s7v.onrender.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
