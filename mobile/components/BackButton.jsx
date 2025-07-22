import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";

const BackButton = ({ style, iconSize = 26 }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <CaretLeft size={32} color="white" weight="bold" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#525252",
    alignSelf: "flex-start",
    borderRadius: 12,
    borderCurve: "continuous",
    padding: 5,
  },
});
