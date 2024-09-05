import Cookies from 'js-cookie';

export const useLogout = () => {
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
  };

  return { logout };
};
