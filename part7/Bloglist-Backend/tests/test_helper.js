const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

const initialBlogs = [
  {
    title: 'api is the future',
    author: 'Beve Blasha',
    url: 'www.api_for_all.com',
    likes: 1,
  },
  {
    title: 'Javascript is easy',
    author: 'Beve Blasha',
    url: 'www.javascript.com',
    likes: 50,
  },
];

const initialUsers = [
  { username: 'Waza', name: 'Wayne Rooney', password: '321' },
  { username: 'Gaucho', name: 'Ronaldinho Gaucho', password: '123' },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'api is the future',
    author: 'Beve Blasha',
    url: 'www.api_for_all.com',
    likes: 1,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const tokenGenerator = async () => {
  const username = initialUsers[0].username;
  const user = await User.findOne({ username });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRETE);
  const decodedToken = jwt.verify(token, config.SECRETE);
  console.log('decodeeeeeeeeeed', decodedToken);
  return {
    token: token,
    username: userForToken.username,
    id: userForToken.id,
  };
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  tokenGenerator,
};
