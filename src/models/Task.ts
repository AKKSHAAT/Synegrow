import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Task extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: 'PENDING' | 'COMPLETED' | 'IN_PROGRESS';
  public createdAt!: number;
  public updatedAt!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('PENDING', 'COMPLETED', 'IN_PROGRESS'),
    createdAt: DataTypes.INTEGER,
    updatedAt: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
  }
);

export default Task;