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
import { useAuth } from "../../contexts/authContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginUser } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await loginUser(values);

      if (!res?.isSuccess) {
        Alert.alert("1 Error", res?.message);
      }
    } catch (error) {
      Alert.alert(
        "Server Error",
        error?.message || "Error while registering new user."
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
          <Text className="text-2xl font-bold text-white">Hey,</Text>
          <Text className="text-2xl font-bold text-white">Welcome Back</Text>
        </View>

        {/* form */}
        <View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
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

                <Text className="text-white self-end">Forgot Password?</Text>

                <Button loading={loading} onPress={handleSubmit} title="Submit">
                  <Text className="text-white font-semibold text-xl">
                    Log In
                  </Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>

        <View className="flex flex-row justify-center">
          <Text className="text-[#ccc] text-[13px]">
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text className="text-[#a3e635] text-[13px] underline font-semibold">
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({});
