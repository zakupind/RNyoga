import { createSlice } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  expiredSubscription: Date | null;
  isAuth: boolean;
}

const initialState: User = {
  name: '',
  email: '',
  expiredSubscription: null,
  isAuth: false,
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
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.expiredSubscription = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, clearUser } = user.actions;
export const userReducer = user.reducer;
