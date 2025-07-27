import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Trash } from "phosphor-react-native";

const DeleteButton = ({ style, iconSize = 26, onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete} style={[styles.button, style]}>
      <Trash size={24} color="#ef4444" weight="bold" />
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#525252",
    alignSelf: "flex-start",
    borderRadius: 12,
    borderCurve: "continuous",
    padding: 5,
  },
});
