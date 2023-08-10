import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from "sequelize-typescript";

@Table({
  modelName: "TodoModel",
  tableName: "todos",
  timestamps: false,
})
class TodoModel extends Model {
  @AllowNull(false)
  @Column(DataType.UUID)
  public id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public content!: string;
}

export { TodoModel };
