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
      state.push(blog);
      return state;
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
      const newBlog = await blogService.create(blogObj);
      dispatch(appendBlog(newBlog));
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

export const { setBlogs, appendBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
