import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { handleNotification } from './notificationReducer';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      state = blogs;
      return state;
    },
    appendBlog(state, action) {
      const blog = action.payload;
      console.log('newBlog', blog);
      state.push(blog);
      return state;
    },
    alterBlog(state, action) {
      const updatedBlog = action.payload;

      const index = state.findIndex((blog) => blog.id === updatedBlog.id);
      state[index] = { ...updatedBlog };
      return state;
    },
    removeBlog(state, action) {
      const blogId = action.payload;
      const blogsAfterDelete = state.filter((blog) => blog.id !== blogId);
      return blogsAfterDelete;
    },
  },
});

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blogObj) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObj.blog);
      dispatch(appendBlog({ ...newBlog, user: blogObj.user }));
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
        message: `a new blog ${blogObj.title} by ${blogObj.author} added`,
      })
    );
  };
};

export const likeBlog = (updatedBlog) => {
  return async (dispatch) => {
    const results = await blogService
      .update(updatedBlog, updatedBlog.id)
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
    dispatch(alterBlog({ ...results, user: updatedBlog.user }));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId);
    } catch (error) {
      dispatch(
        handleNotification({
          type: 'error',
          message: error.response.data.error,
        })
      );
      return;
    }
    dispatch(removeBlog(blogId));
    dispatch(
      handleNotification({
        type: 'success',
        message: 'blog successfuly deleted',
      })
    );
  };
};

export const { setBlogs, appendBlog, alterBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;
