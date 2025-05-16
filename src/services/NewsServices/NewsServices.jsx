import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance from "../../Config/apiInstance";

export const getAllNews = async (search = "") => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getNews}?search=${search}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await apiInstance.get(`${apiEndpoints.getNews}/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
