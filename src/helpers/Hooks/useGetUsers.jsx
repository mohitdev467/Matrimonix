import { useState, useCallback, useEffect } from "react";
import useAuthStorage from "./useAuthStorage";
import {
  getAllConvesations,
  getAllUsers,
} from "../../services/UserServices/UserServices";

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { loginData } = useAuthStorage();

  const fetchGetUsers = useCallback(async () => {
    if (!loginData?.data?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllUsers();
      if (result?.success) {
        const filteredData = result.data.filter(
          (user) => user._id !== loginData?.data?._id
        );
        setUsers(filteredData);
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
    fetchGetUsers();
  }, [fetchGetUsers]);

  return { fetchGetUsers, users, isLoading, error };
};

export default useGetUsers;
