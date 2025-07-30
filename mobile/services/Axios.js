import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const Axios = axios.create({
  baseURL: "https://expense-tracker-x1po.onrender.com/api",
});

Axios.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
