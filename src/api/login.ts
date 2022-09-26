import axios from 'axios';
import { setAuthTokens, clearAuthTokens } from 'react-native-axios-jwt';
import { api, BASE_URL } from './api';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ISignupRequest {
  email: string;
  name: string;
  password: string;
}

interface IForgotPassword {
  email: string;
}

interface IEditPassword {
  oldPassword: string;
  newPassword: string;
}

export const forgotPassword = async (params: IForgotPassword) =>
  await axios.post(`${BASE_URL}/auth/forgot-password`, params);

export const editPassword = async (params: IEditPassword) =>
  await api.post(`${BASE_URL}/auth/edit-password`, params);

// 4. Log in by POST-ing the email and password and get tokens in return
// and call setAuthTokens with the result.
export const login = async (params: ILoginRequest) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, params);

  // save tokens to storage
  await setAuthTokens({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  });

  return response;
};

export const signup = async (params: ISignupRequest) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, params);

  // save tokens to storage
  await setAuthTokens({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  });

  return response;
};

export const getUserRequest = async () => {
  const response = await api.get('/auth/user');
  return response;
};

// 5. Log out by clearing the auth tokens from AsyncStorage
export const logout = () => clearAuthTokens();
