import axios from "axios";
import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance, { API_BASE_URL } from "../../Config/apiInstance";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";
import ErrorHandler from "../NotificationServices/ErrorHandler";

export const getAllUsers = async (id, search = "") => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getUsers}?search=${search}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getUserDetailsById = async (id) => {
  try {
    const response = await apiInstance.get(`${apiEndpoints.getUsers}/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
export const handleRecentUserById = async (email, gender) => {
  try {
    const response = await apiInstance.get(
      apiEndpoints.getRecentUserById(email, gender)
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const handleUpdateUser = async (id, data) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await apiInstance.put(
      `${API_BASE_URL}${apiEndpoints.getUsers}/${id}`,
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getImageUrl = async (file) => {
  console.log("file", file);
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      `${API_BASE_URL}${apiEndpoints.uploadFile}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data?.image?.url;
  } catch (error) {
    ErrorHandler(error?.response?.data?.message);
    throw new Error(
      error.response?.data?.message || commonUtils.unexpectedError
    );
  }
};

export const handleMatchedUsersById = async (id) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getMatchedUsers(id)}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const handleAddUserShortlist = async (userId, addedBy) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await apiInstance.post(
      `${API_BASE_URL}${apiEndpoints.addUserIntoShortlist}`,
      { userId: userId, addedBy: addedBy }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getAllShortlistedUsers = async (id) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.addUserIntoShortlist}/${id}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getAllStatsData = async (id) => {
  try {
    const response = await apiInstance.get(`${apiEndpoints.getStatsData(id)}`);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getAllConvesations = async (id) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getConversation(id)}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};


export const handlePaymentHistory = async (userId) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getPaymentHistory(userId)}`
    );
    
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getPaymentStatus = async (orderid) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.checkPaymentStatus(orderid)}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
