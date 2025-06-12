import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance from "../../Config/apiInstance";

export const getMessageNotification = async (id) => {
  try {
    const response = await apiInstance.post("http://localhost:4000/send-notification");
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};