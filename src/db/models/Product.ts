import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare sku: string;

  get displayName() {
    return this.name;
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    indexes: [
      {
        unique: true,
        fields: ['sku'],
      },
    ],
  }
);
