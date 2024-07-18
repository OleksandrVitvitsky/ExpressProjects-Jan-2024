import dotenv from "dotenv";

dotenv.config();
export const config = {
  port: Number(process.env.port),
  host: process.env.host,
  mongo_url: process.env.mongo_url,
};
