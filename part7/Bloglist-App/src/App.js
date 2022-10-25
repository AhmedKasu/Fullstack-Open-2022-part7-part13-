import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';

import { initialiseBlogs } from './reducers/blogsReducer';
import { resetLoggedUser, getLoggeduser } from './reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (user.length > 0) {
      dispatch(initialiseBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(getLoggeduser());
  }, [dispatch]);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser');
    dispatch(resetLoggedUser());
    blogService.setToken(null);
  };
  const blogsFormRef = useRef();

  const renderBlogsForm = () => (
    <Togglable buttonLabel='new blog' ref={blogsFormRef}>
      <BlogsForm blogsFormRef={blogsFormRef} loggedUser={user[0]} />
    </Togglable>
  );

  const renderBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      return b.likes - a.likes;
    });
    return (
      <div>
        <h1>Blogs</h1>
        <span>{`${user[0].name} logged in `}</span>
        <button id='logout' type='button' onClick={handleLogOut}>
          logout
        </button>
        {renderBlogsForm()}
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} loggedUser={user[0].name} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notify />
      {user.length < 1 ? <LoginForm /> : renderBlogs()}
    </div>
  );
};

export default App;
