import Cookies from 'js-cookie';
import { adminApi } from './api';

export const auth = {
  login: async (username, password) => {
    try {
      const response = await adminApi.login(username, password);
      const { token } = response.data;
      Cookies.set('admin_token', token, { expires: 7 });
      return true;
    } catch (error) {
      return false;
    }
  },
  
  logout: () => {
    Cookies.remove('admin_token');
  },
  
  isAuthenticated: () => {
    return !!Cookies.get('admin_token');
  }
};
