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
    alterBlog(state, action) {
      const updatedBlog = action.payload;
      console.log('updatedd', updatedBlog);
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
      return;
    }
    dispatch(
      handleNotification({
        type: 'success',
        message: `a new blog ${blogObj.blog.title} by ${blogObj.blog.author} added`,
      })
    );
  };
};

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    await blogService.update(likedBlog, likedBlog.id).catch((error) => {
      if (error.response) {
        dispatch(
          handleNotification({
            type: 'error',
            message: error.response.data.error,
          })
        );
        return;
      }
    });
    dispatch(alterBlog(likedBlog));
  };
};

export const commentBlog = (commentObj) => {
  return async (dispatch) => {
    const blog = commentObj.blog;
    const requestObj = {
      comment: { comment: commentObj.newComment },
      blogId: blog.id,
    };
    const results = await blogService.comment(requestObj).catch((error) => {
      if (error.response) {
        dispatch(
          handleNotification({
            type: 'error',
            message: error.response.data.error,
          })
        );
        return;
      }
    });
    const commentedBlog = { ...blog, comments: blog.comments.concat(results) };
    dispatch(alterBlog(commentedBlog));
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
