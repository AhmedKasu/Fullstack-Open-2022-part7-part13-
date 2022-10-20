import { createSlice } from '@reduxjs/toolkit';

const initialState = { success: null, error: null };
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessMessage(state, action) {
      const message = action.payload.message;
      const timer = action.payload.timerId;
      clearTimeout(timer - 1);
      state.success = message;
      return state;
    },
    setErrorMessage(state, action) {
      const message = action.payload.message;
      const timer = action.payload.timerId;
      clearTimeout(timer - 1);
      state.error = message;
      return state;
    },
    resetNotification(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const handleNotification = (notification) => {
  return (dispatch) => {
    if (notification.type === 'success') {
      const timer = setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
      dispatch(
        setSuccessMessage({ message: notification.message, timerId: timer })
      );
    } else {
      const timer = setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);

      dispatch(
        setErrorMessage({ message: notification.message, timerId: timer })
      );
    }
  };
};

export const { setSuccessMessage, setErrorMessage, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
