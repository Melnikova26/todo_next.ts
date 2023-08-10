import { DataTypes, Model, Optional } from "sequelize";
import db from "../db";

interface TodoAttributes {
  id: string;
  title: string;
  content: string;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> {}

class TodoModel
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
}

TodoModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "TodoModel",
    tableName: "todos",
    timestamps: false,
  }
);

export { TodoModel };
