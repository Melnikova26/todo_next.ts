import { Sequelize } from "sequelize-typescript";
import { TodoModel } from "./models/TodoModel";

const sequelize = new Sequelize(
  process.env.DB_NAME || "todo",
  process.env.DB_USER || "postgress",
  process.env.DB_PASSWORD || "postgress",
  {
    host: process.env.DB_HOST || "postgres",
    dialect: "postgres",
  }
);
sequelize.addModels([TodoModel]);

export default sequelize;
