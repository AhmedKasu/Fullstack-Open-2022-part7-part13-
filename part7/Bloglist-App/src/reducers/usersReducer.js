import blogService from '../services/blogs';
import usersService from '../services/users';

import { createSlice } from '@reduxjs/toolkit';

const initialState = { loggedUsers: [], allUsers: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      const userObj = action.payload;
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userObj));
      blogService.setToken(userObj.token);
      state.loggedUsers.push(userObj);
    },
    resetLoggedUser(state, action) {
      state.loggedUsers = [];
      return state;
    },
    setAllUsers(state, action) {
      const allUsers = action.payload;
      state.allUsers = allUsers;
      return state;
    },
  },
});

export const getLoggeduser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const allUsers = await usersService.getAll(user.token);
      dispatch(setAllUsers(allUsers));
    }
  };
};

export const { setLoggedUser, resetLoggedUser, setAllUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
