import Cookies from 'js-cookie';

export function getAuthorizationHeader() {
  const token = Cookies.get('token');

  return {
    Authorization: `Bearer ${token ?? ''}`,
  };
}
