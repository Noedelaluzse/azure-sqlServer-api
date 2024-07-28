import sql from "mssql";
import { envs } from "../config/envs.js";

const config = {
  user: envs.USERNAME_DB_AZURE, // better stored in an app setting such as process.env.DB_USER
  password: envs.PASSWORD_DB_AZURE, // better stored in an app setting such as process.env.DB_PASSWORD
  server: `${envs.DB_SERVER_AZURE}.database.windows.net`, // better stored in an app setting such as process.env.DB_SERVER
  port: envs.DB_PORT_AZURE, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: envs.DB_NAME_AZURE, // better stored in an app setting such as process.env.DB_NAME
  authentication: {
      type: 'default'
  },
  options: {
      encrypt: true
  }
}

export const getConnection = async() => {

  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query("SELECT GETDATE()");
    console.log(result);

    return pool;
  } catch(error) {
    console.log(error);
  }
} 

