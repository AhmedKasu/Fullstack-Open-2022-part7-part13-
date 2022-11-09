import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async (token) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const createUser = async (userObj) => {
  await axios.post(baseUrl, userObj);
};
export default { getAll, createUser };
