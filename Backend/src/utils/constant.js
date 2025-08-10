import { config } from "dotenv";
config();
export const port = process.env.PORT;
export const dbURL = process.env.DB_URL;
// export const dbUrlLocal = process.env.DB_URL_LOCAL;

export const secretKey = process.env.JWT_SECRET;
export const expiresIn = process.env.JWT_EXPIRES_IN;

/* 
    mongodb username: magarbimal47
    mongodb password: h89aKsO9ZGBu126o
*/
