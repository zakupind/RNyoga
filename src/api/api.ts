import {
  TokenRefreshRequest,
  applyAuthTokenInterceptor,
  setAuthTokens,
} from 'react-native-axios-jwt';
import axios from 'axios';

export const BASE_URL = 'http://tm-coach.ru/api';
export const BASE_URL_HTTP = 'http://tm-coach.ru/api';

// 1. Create an axios instance that you wish to apply the interceptor to
export const api = axios.create({ baseURL: BASE_URL });

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<string> => {
  // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
  // because this will result in an infinite loop when trying to refresh the token.
  // Use the global axios client or a different instance
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    token: refreshToken,
  });

  if (response && response.data && response.data.access_token) {
    setAuthTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });
  }
  return response.data.access_token;
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(api, { requestRefresh });
