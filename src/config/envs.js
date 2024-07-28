import 'dotenv/config';
import env from 'env-var';


export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PUBLIC_PATH: env.get('PUBLIC_PATH').required().default('public').asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),
  DB_SERVER_AZURE: env.get('DB_SERVER_AZURE').required().asString(),
  DB_PORT_AZURE: env.get('DB_PORT_AZURE').asPortNumber(),
  DB_NAME_AZURE: env.get('DB_NAME_AZURE').required().asString(),
  USERNAME_DB_AZURE: env.get('USERNAME_DB_AZURE').required().asString(),
  PASSWORD_DB_AZURE: env.get('PASSWORD_DB_AZURE').required().asString()
}