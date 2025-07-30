import { Axios } from "./Axios";
import { uploadFileToCloudinary } from "./imageService";
import { router } from "expo-router";

export const create = async (formData, path) => {
  try {
    if (formData.image && typeof formData.image === "object") {
      const response = await uploadFileToCloudinary(
        formData.image,
        "expense_tracker/transactions/"
      );

      formData.avatar = {
        public_id: response?.public_id,
        url: response?.url,
      };

      delete formData.image;
    } else {
      delete formData.image;
    }

    if (formData.type == "income") {
      delete formData.category;
    }

    formData.amount = String(formData.amount);

    const res = await Axios.post("/transactions/create", formData);
    console.log("✅ Response Status:", res.status);
    console.log("✅ Response Data:", res.data);

    if (res.status === 201) {
      router.push("/(tabs)");
    }
  } catch (error) {
    console.log("Axios Error Message:", error.message);

    if (error.response) {
      console.log("❌ Error Status:", error.response.status);
      console.log("❌ Error Data:", error.response.data);
      console.log("❌ Error Headers:", error.response.headers);
    } else if (error.request) {
      console.log("❌ No response received:", error.request);
    } else {
      console.log("❌ Error setting up request:", error.message);
    }
  }
};
