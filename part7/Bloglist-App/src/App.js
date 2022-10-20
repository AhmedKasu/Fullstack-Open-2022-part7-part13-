import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import Notify from './components/Notify';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';

import { handleNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      };
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const blogsFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setCredentials({ username: '', password: '' });
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreate = async (newBlogObject) => {
    blogsFormRef.current.toggleVisibility();
    let res = null;

    try {
      res = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(res));
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
    }
    dispatch(
      handleNotification({
        type: 'success',
        message: `a new blog ${res.title} by ${res.author} added`,
      })
    );
  };

  const handleUpdate = async (updatedBlogObject) => {
    const res = await blogService
      .update(updatedBlogObject, updatedBlogObject.id)
      .catch((error) => {
        if (error.response) {
          dispatch(
            handleNotification({
              type: 'error',
              message: error.response.data.error,
            })
          );
        }
      });

    const blogToUpdate = blogs.find((blog) => blog.id === updatedBlogObject.id);
    const updatedBlogs = [...blogs];
    const index = updatedBlogs.indexOf(blogToUpdate);
    updatedBlogs[index] = { ...res, user: blogToUpdate.user };
    setBlogs(updatedBlogs);
  };

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      const blogsAfterDelete = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(blogsAfterDelete);
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
      return;
    }

    dispatch(
      handleNotification({
        type: 'success',
        message: 'blog successfuly deleted',
      })
    );
  };

  const renderBlogsForm = () => (
    <Togglable buttonLabel='new blog' ref={blogsFormRef}>
      <BlogsForm handleCreate={handleCreate} />
    </Togglable>
  );

  const renderBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    return (
      <div>
        <h1>Blogs</h1>
        <span>{`${user.name} logged in `}</span>
        <button id='logout' type='button' onClick={handleLogOut}>
          logout
        </button>
        {renderBlogsForm()}
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user.name}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notify />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      ) : (
        renderBlogs()
      )}
    </div>
  );
};

export default App;
