import { useState, useCallback, useEffect } from "react";
import { getAllShortlistedUsers } from "../../services/UserServices/UserServices";
import useAuthStorage from "./useAuthStorage";

const useShortlistUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortlistData, setShortlistData] = useState([]);
  const [error, setError] = useState(null);
  const { loginData } = useAuthStorage();

  const fetchShortlistedUsers = useCallback(async () => {
    if (!loginData?.data?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllShortlistedUsers(loginData.data._id);
      if (result?.success) {
        setShortlistData(result.data);
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
    fetchShortlistedUsers();
  }, [fetchShortlistedUsers]);

  return { fetchShortlistedUsers, shortlistData, isLoading, error };
};

export default useShortlistUser;
