import { useEffect, useState, useCallback } from "react";
import { getUserDetailsById } from "../../services/UserServices/UserServices";
import { commonUtils } from "../../utilities/CommonUtils/CommonUtils";

const useUserDetailsById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const result = await getUserDetailsById(id);
      if (result?.success) {
        setData(result?.data || null);
        setError(null);
      } else {
        setError("Failed to fetch user details");
      }
    } catch (err) {
      console.error(commonUtils.errorFetchingData, err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);
  return { data, loading, error, refetch: fetchUserDetails };
};

export default useUserDetailsById;
