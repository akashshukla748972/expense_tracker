import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import ScreenWrapper from "../../components/ScreenWrapper";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { LoginSchema } from "../../utils/validation/LoginSchema";
import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { RegisterSchema } from "../../utils/validation/RegisterSchema";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../contexts/authContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { registerUser } = useAuth();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const { isSuccess, message } = await registerUser(values);
      if (isSuccess) {
        Alert.alert("Success", message);
        await SecureStore.setItemAsync("token", res.data?.token);
        router.push("/welcome");
      } else if (
        !isSuccess &&
        message == "Request failed with status code 409"
      ) {
        Alert.alert("Error", "Email already exist please login.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Error while registering new user."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper>
      <View className="flex-1 gap-8 px-5">
        <BackButton />

        <View className="flex gap-1 mt-5">
          <Text className="text-2xl font-bold text-white">Let's,</Text>
          <Text className="text-2xl font-bold text-white">Get Started</Text>
        </View>

        {/* form */}
        <View>
          <Text className="text-[#d4d4d4] mb-1">
            Create an account to track your expenses
          </Text>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View className="w-full flex gap-4">
                <View className="flex gap-1">
                  <Text className="text-[#fff] font-semibold">Name</Text>
                  <View className="flex flex-row items-center border border-white rounded px-2">
                    <AntDesign name="user" size={24} color="#ccc" />
                    <TextInput
                      className="flex-1 text-white text-[17px] ml-2"
                      placeholderTextColor={"#ccc"}
                      keyboardType="default"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Enter your name"
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text className="text-red-500 text-sm mb-2">
                      {errors.name}
                    </Text>
                  )}
                </View>

                <View className="flex gap-1">
                  <Text className="text-[#fff] font-semibold">Email</Text>
                  <View className="flex flex-row items-center border border-white rounded px-2">
                    <Fontisto name="email" size={24} color="#ccc" />
                    <TextInput
                      className="flex-1 text-white text-[17px] ml-2"
                      placeholderTextColor={"#ccc"}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Enter your email"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mb-2">
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View className="flex gap-1">
                  <Text className="text-[#fff] font-semibold">Password</Text>
                  <View className="flex flex-row items-center border border-white rounded px-2">
                    {showPassword ? (
                      <AntDesign
                        onPress={() => setShowPassword(false)}
                        name="lock"
                        size={24}
                        color="#ccc"
                      />
                    ) : (
                      <Ionicons
                        onPress={() => setShowPassword(true)}
                        name="key-outline"
                        size={24}
                        color="#ccc"
                      />
                    )}

                    <TextInput
                      className="flex-1 text-white text-[17px] ml-2"
                      placeholderTextColor={"#ccc"}
                      keyboardType="default"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Enter your password"
                      secureTextEntry={!showPassword}
                    />
                  </View>
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-sm mb-2">
                      {errors.password}
                    </Text>
                  )}
                </View>

                <Button loading={loading} onPress={handleSubmit} title="Submit">
                  <Text className="text-white font-semibold text-xl">
                    Sign Up
                  </Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>

        <View className="flex flex-row justify-center">
          <Text className="text-[#ccc] text-[13px]">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-[#a3e635] text-[13px] underline font-semibold">
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({});
