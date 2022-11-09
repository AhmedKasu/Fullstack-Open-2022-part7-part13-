import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useMatch,
  Navigate,
} from 'react-router-dom';

import Blogs from './components/Blogs';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import User from './components/User';
import './index.css';

import blogService from './services/blogs';

import { resetLoggedUser } from './reducers/usersReducer';
import { initialiseBlogs } from './reducers/blogsReducer';
import { getLoggeduser, getAllUsers } from './reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from 'react-bootstrap';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.users.loggedUsers);
  const allUsers = useSelector((state) => state.users.allUsers);
  const blogs = useSelector((state) => state.blogs);

  const blogMatch = useMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const userMatch = useMatch('/users/:id');
  const user = userMatch
    ? allUsers.find((user) => user.id === userMatch.params.id)
    : null;

  useEffect(() => {
    if (loggedUser.length > 0) {
      dispatch(initialiseBlogs());
      dispatch(getAllUsers());
    }
  }, [loggedUser, dispatch]);

  useEffect(() => {
    dispatch(getLoggeduser());
  }, [dispatch]);

  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser');
    dispatch(resetLoggedUser());
    blogService.setToken(null);
    navigate('/login');
  };

  const handleRedirect = (component) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      return component;
    } else {
      return <Navigate replace to='/login' />;
    }
  };

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'>
      <div className='App-Container'>
        <Navbar
          loggedUser={loggedUser}
          handleLogOut={handleLogOut}
          handleLogin={handleLogin}
        />
        <div>
          <Notify />
          <Routes>
            <Route
              path='/blogs/:id'
              element={handleRedirect(
                <Blog blog={blog} loggedUser={loggedUser} />
              )}
            />
            <Route
              path='/users/:id'
              element={handleRedirect(<User user={user} />)}
            />
            <Route
              path='/users'
              element={handleRedirect(<Users users={allUsers} />)}
            />
            <Route
              path='/blogs'
              element={handleRedirect(
                <Blogs loggedUser={loggedUser} blogs={blogs} />
              )}
            />
            <Route path='/login' element={<LoginForm />} />
            <Route
              path='/'
              element={handleRedirect(
                <Blogs loggedUser={loggedUser} blogs={blogs} />
              )}
            />
            <Route path='/signup' element={<SignupForm />} />
          </Routes>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
};

export default App;
