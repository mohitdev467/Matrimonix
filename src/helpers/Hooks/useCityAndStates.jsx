import { useState, useEffect } from 'react';
import axios from 'axios';

const useCityAndStates = () => {
  const [states, setStates] = useState({ data: [], loading: false, error: null });
  const [cities, setCities] = useState({ data: [], loading: false, error: null });

  useEffect(() => {
    const fetchStates = async () => {
      setStates({ ...states, loading: true });
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
        setStates({ data: response.data.data.find(country => country.name === 'India')?.states || [], loading: false, error: null });
      } catch (error) {
        setStates({ data: [], loading: false, error: 'Failed to fetch states' });
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (country, state) => {
    setCities({ ...cities, loading: true });
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: country || 'India',
        state,
      });
      setCities({ data: response.data.data, loading: false, error: null });
    } catch (error) {
      setCities({ data: [], loading: false, error: 'Failed to fetch cities' });
    }
  };

  return { states, cities, fetchCities };
};

export default useCityAndStates;
