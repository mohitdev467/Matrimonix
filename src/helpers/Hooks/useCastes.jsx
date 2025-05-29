import { useEffect, useState } from 'react';
import axios from 'axios';
import apiInstance from '../../Config/apiInstance';
import { apiEndpoints } from '../../Config/apiEndpoints';

const useCastes = () => {
  const [castes, setCastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastes = async () => {
      try {
        const response = await apiInstance.get(apiEndpoints.getAllCastes);
        setCastes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCastes();
  }, []);

  return { castes, loading, error };
};

export default useCastes;
