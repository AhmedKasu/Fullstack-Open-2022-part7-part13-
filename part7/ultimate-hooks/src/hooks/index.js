import { useState, useEffect, useMemo } from 'react';
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    getAll();
  }, [baseUrl]);

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    const updatedResources = [...resources, response.data];
    setResources(updatedResources);
    return response.data;
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  };

  const services = {
    create,
    update,
    setToken,
  };

  return [resources, services];
};

export default useResource;
