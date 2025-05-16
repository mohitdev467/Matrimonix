import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const truncateText = (text, wordLimit = 10) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export const formattedDate = (date) => {
  if (moment(date).isSame(moment(), "day")) {
    return moment(date).fromNow();
  } else {
    return moment(date).format("DD/MM/YYYY");
  }
};

export const getPlanType = (no_of_days) => {
  if (no_of_days === 30) return "Monthly";
  if (no_of_days === 180) return "Semesterly";
  if (no_of_days === 365) return "Yearly";
};

export const calculateMonthlyAmount = (amount, no_of_days) => {
  if (no_of_days === 30) return amount;
  if (no_of_days === 180) return amount / 6;
  if (no_of_days === 365) return amount / 12;
  return (amount / (no_of_days / 30)).toFixed(2);
};

export const formatData = (dataArray, labelKey, valueKey) => {
  return dataArray?.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

const logoutUser = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export default logoutUser;
