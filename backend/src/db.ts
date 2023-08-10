import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo", "postgress", "postgress", {
  host: "postgres",
  dialect: "postgres",
});

export default sequelize;
