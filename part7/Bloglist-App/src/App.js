import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import Notify from './components/Notify';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';

import { handleNotification } from './reducers/notificationReducer';
import { initialiseBlogs } from './reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user) {
      dispatch(initialiseBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

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
  const blogsFormRef = useRef();

  const renderBlogsForm = () => (
    <Togglable buttonLabel='new blog' ref={blogsFormRef}>
      <BlogsForm blogsFormRef={blogsFormRef} loggedUser={user} />
    </Togglable>
  );

  const renderBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => {
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
          <Blog key={blog.id} blog={blog} loggedUser={user.name} />
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
