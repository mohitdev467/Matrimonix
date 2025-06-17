import { useEffect, useState } from 'react';
import apiInstance from '../../Config/apiInstance';
import { apiEndpoints } from '../../Config/apiEndpoints';

const useOccupations = () => {
  const [occupations, setOccupations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await apiInstance.get(apiEndpoints.getAllOccupations);
        setOccupations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupations();
  }, []);

  return { occupations, loading, error };
};

export default useOccupations;
