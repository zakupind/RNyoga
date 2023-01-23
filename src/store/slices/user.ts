import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

interface User {
  name: string;
  email: string;
  expiredSubscription: Date | null;
  isAuth: boolean;
  isSubscriber: boolean;
}

const initialState: User = {
  name: '',
  email: '',
  expiredSubscription: null,
  isAuth: false,
  isSubscriber: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.expiredSubscription = action.payload.expiredSubscription;
      state.isAuth = true;
      state.isSubscriber = Boolean(
        action.payload.expiredSubscription &&
          moment(action.payload.expiredSubscription).isAfter(
            moment(new Date()),
          ),
      );
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.expiredSubscription = null;
      state.isAuth = false;
      state.isSubscriber = false;
    },
  },
});

export const { setUser, clearUser } = user.actions;
export const userReducer = user.reducer;
