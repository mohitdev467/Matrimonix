import { useEffect, useState } from 'react';
import axios from 'axios';
import apiInstance from '../../Config/apiInstance';
import { apiEndpoints } from '../../Config/apiEndpoints';

const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await apiInstance.get(apiEndpoints.getAllLanguages);
        setLanguages(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading, error };
};

export default useLanguages;
