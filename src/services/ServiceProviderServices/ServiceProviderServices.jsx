import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance from "../../Config/apiInstance";

export const getAllServiceProvider = async (search = "") => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getServiceProviders}?search=${search}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getServieProviderById = async (id) => {
  try {
    const response = await apiInstance.get(
      `${apiEndpoints.getServiceProviders}/${id}`
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
