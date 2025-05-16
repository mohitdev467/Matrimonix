import { useState, useEffect } from "react";
import { apiEndpoints } from "../../Config/apiEndpoints";
import apiInstance from "../../Config/apiInstance";

const usePackages = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiInstance.get(`${apiEndpoints.getPackages}`);
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};

export default usePackages;
