import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      const userObj = action.payload;
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userObj));
      blogService.setToken(userObj.token);
      state.push(userObj);
    },
    resetLoggedUser(state, action) {
      state = initialState;
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

export const { setLoggedUser, resetLoggedUser } = userSlice.actions;
export default userSlice.reducer;
