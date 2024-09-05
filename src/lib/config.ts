import dotenv from 'dotenv';

dotenv.config();

const env_config = {
    moderate_service_url: process.env.NEXT_PUBLIC_MODERATE_SERVICE_URL,
    submit_service_url: process.env.NEXT_PUBLIC_SUBMIT_SERVICE_URL,
    deliver_service_url: process.env.NEXT_PUBLIC_DELIVER_SERVICE_URL,
    jwt_secret_key: process.env.NEXT_PUBLIC_JWT_SECRET_KEY
}
export default env_config;
