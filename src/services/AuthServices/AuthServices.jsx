import axios from "axios";
import { apiEndpoints } from "../../Config/apiEndpoints";
import { API_BASE_URL } from "../../Config/apiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const handleLoginUser = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.loginUser}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await AsyncStorage.setItem("authToken", response?.data?.accessToken);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const handleRegisterUser = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // optional delay

    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.signupUser}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;

    await AsyncStorage.setItem("authToken", responseData?.accessToken);

    return { success: true, data: responseData };
  } catch (error) {
    console.log("errorrr", error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to register user",
    };
  }
};

export const handleForgotPassword = async (data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.forgotPassword}`,
      data,
      headers
    );
    await AsyncStorage.setItem("resetToken", response?.data?.resetToken);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
export const handleUpdatePassword = async (data) => {
  try {
    const token = await AsyncStorage.getItem("resetToken");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.updatePassword(token)}`,
      data,
      headers
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
