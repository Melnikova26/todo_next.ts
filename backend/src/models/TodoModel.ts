import { DataTypes } from "sequelize";
import { Model, Table, Column } from "sequelize-typescript";

@Table
class TodoModel extends Model {
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  content!: string;
}

export { TodoModel };
