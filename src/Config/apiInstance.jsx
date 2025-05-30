import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = "http://143.110.243.199/api/v1/"; 
// export const API_BASE_URL = "http://192.168.29.57:4000/api/v1/"; 


const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

// Add interceptor to attach token and language
apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Language"] = "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
