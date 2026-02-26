import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  models: [join(__dirname, "../models")],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});