import { useState, useCallback, useEffect } from "react";
import { getAllStatsData } from "../../services/UserServices/UserServices";
import useAuthStorage from "./useAuthStorage";

const useStatsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [error, setError] = useState(null);
  const { loginData } = useAuthStorage();

  const fetchStatsData = useCallback(async () => {
    if (!loginData?.data?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllStatsData(loginData.data._id);
      if (result?.success) {
        setStatsData(result.data);
      } else {
        setError(result?.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [loginData]);

  useEffect(() => {
    fetchStatsData();
  }, [fetchStatsData]);

  return { fetchStatsData, statsData, isLoading, error };
};

export default useStatsData;
