import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const config = (token) => {
  return { headers: { Authorization: token } };
};
const getAll = async () => {
  const authToken = config(token);
  const request = await axios.get(baseUrl, authToken);
  return request.data;
};

const create = async (newBlogObject) => {
  const authToken = config(token);
  const request = await axios.post(baseUrl, newBlogObject, authToken);
  return request.data;
};

const update = async (newBlogObject) => {
  const authToken = config(token);
  const request = await axios.put(
    `${baseUrl}/${newBlogObject.id}`,
    newBlogObject,
    authToken
  );
  return request.data;
};

const deleteBlog = async (blogId) => {
  const authToken = config(token);
  await axios.delete(`${baseUrl}/${blogId}`, authToken);
};

const comment = async (newComment) => {
  const authToken = config(token);

  const request = await axios.post(
    `${baseUrl}/${newComment.blogId}/comments`,
    newComment.comment,
    authToken
  );
  return request.data;
};

export default { getAll, setToken, create, update, deleteBlog, comment };
