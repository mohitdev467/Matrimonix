import { useEffect, useState } from 'react';
import apiInstance from '../../Config/apiInstance';
import { apiEndpoints } from '../../Config/apiEndpoints';


const useCityAndStates = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [citiesRes, statesRes] = await Promise.all([
        apiInstance.get(apiEndpoints.getAllCities),
        apiInstance.get(apiEndpoints.getAllStates)
      ]);


      setCities(citiesRes.data);
      setStates(statesRes.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    cities,
    states,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useCityAndStates;
