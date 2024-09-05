import { jwtVerify } from 'jose';
import env_config from './config';

export const getJwtSecretKey = () => {
  const secret = env_config.jwt_secret_key;

  if (secret?.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    if (verified.payload?.role === 'Admin') {
      return true;
    } else {
      return false;
    }

  } catch (error) {
    throw new Error('Your token has expired');
  }
};
