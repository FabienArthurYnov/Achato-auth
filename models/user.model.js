import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class User extends Model {}

User.init(
  {
    User_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User_FirstName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_LastName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Phone: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Role: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Password: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: false,
    },
    User_Email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);