import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName: string | undefined = process.env.DB_NAME;
const dbUser: string | undefined = process.env.DB_USER;
const dbPassword: string | undefined = process.env.DB_PASSWORD;
const dbHost: string | undefined = process.env.DB_HOST;

let sequelize: Sequelize | undefined;

if (dbName && dbUser && dbPassword && dbHost) {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "postgres",
  });
}

export default sequelize;
