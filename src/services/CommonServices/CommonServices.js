import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance from "../../Config/apiInstance";

export const createConversation = async (participants) => {
  try {
    const response = await apiInstance.post(apiEndpoints.createConversation, {
      participants,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating conversation:",
      error.response?.data || error.message
    );
    return null;
  }
};
export const createMessages = async (payload) => {
  try {
    const response = await apiInstance.post(
      apiEndpoints.createMessagesEndPoint,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating conversation:",
      error.response?.data || error.message
    );
    return null;
  }
};
export const getAllMessages = async (id) => {
  try {
    const response = await apiInstance.get(apiEndpoints.getMessageById(id));
    return response.data;
  } catch (error) {
    console.error(
      "Error getting message:",
      error.response?.data || error.message
    );
    return null;
  }
};
