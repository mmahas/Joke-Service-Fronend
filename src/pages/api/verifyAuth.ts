import { jwtVerify } from 'jose';
import env_config from '../../lib/config';

const getJwtSecretKey = () => {
  const secret = env_config.jwt_secret_key;

  if (!secret) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return secret;
};

export default async function handler(req: any, res: any) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    if (verified.payload?.role === 'Admin') {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(403).json({ valid: false });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Your token has expired' });
  }
}
