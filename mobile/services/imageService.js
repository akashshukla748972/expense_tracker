import axios from "axios";
import { CLOUD_NAME, CLOUD_PRESET } from "../constants/global_variable";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/dkbnxboqd/image/upload`;

export const uploadFileToCloudinary = async (file, folderName) => {
  try {
    if (typeof file == "string") {
      return { isSuccess: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();
      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file?.uri?.split("/").pop() || "file.jpg",
      });
      formData.append("upload_preset", "images");
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = {
        url: response?.data?.secure_url,
        public_id: response?.data?.public_id,
      };

      return { isSuccess: true, avatar: responseData };
    }
    return { isSuccess: true };
  } catch (error) {
    console.log(`Got error uploading file: ${error.message}`);
    return {
      isSuccess: false,
      message: error.message || "Could not upload file this",
    };
  }
};

export const getProfileImage = (file) => {
  if (file && typeof file == "string") return file;
  if (File && typeof file == "object") return file.url;
};
