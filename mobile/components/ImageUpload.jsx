import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icons from "phosphor-react-native";
import { getFilePath } from "../services/imageService";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };
  return (
    <View>
      {!file ? (
        <TouchableOpacity
          onPress={pickImage}
          className={`${containerStyle} flex flex-row justify-center items-center gap-[10px] border-[1px] border-[#737373] h-[45px] bg-[#404040] rounded-[15px] border-dashed`}
        >
          <Icons.UploadSimple color="#ccc" />
          {placeholder && (
            <Text className="text-white text-base font-medium">
              {placeholder}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View
          className={`${imageStyle} relative h-[150px] w-[150px] rounded-xl overflow-hidden`}
        >
          <Image
            style={{ flex: 1 }}
            source={{ uri: getFilePath(file) }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={onClear}
            className="absolute top-[5px] right-[5px] cursor-pointer"
            style={styles.closeButton}
          >
            <Icons.XCircle size={24} color="#fff" weight="fill" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  closeButton: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
