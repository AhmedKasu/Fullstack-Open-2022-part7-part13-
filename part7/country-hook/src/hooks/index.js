import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const url = `https://restcountries.com/v3.1/name/${name}`;

  useEffect(() => {
    const dataFetch = async () => {
      const country = await axios.get(url);
      setCountry(country.data[0]);
    };
    if (name !== '') {
      dataFetch();
    }
  }, [url, name]);
  return country;
};
