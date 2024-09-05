import { authService } from "../../service";
import Cookies from 'js-cookie';

export const useLogin = () => {
  const login = async (authCredentials: any) => {
    const admin = await authService.loginUser(authCredentials);
    if (admin !== null) {
      Cookies.set('token', admin.accessToken.token);
      Cookies.set('id', admin.accessToken._id);
    }
    return admin;
  };

  return { login };
};
