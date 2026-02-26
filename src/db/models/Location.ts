import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Inventory } from './Inventory';

export const LOCATION_TYPES = ['warehouse', 'retail'] as const;
export type LocationType = typeof LOCATION_TYPES[number];

export class Location extends Model {
  declare id: number;
  declare name: string;
  declare capacity: number;
  declare type: LocationType;
  
  static associate() {
    Location.hasMany(Inventory, { foreignKey: "locationId" });
  }
  
  get isWarehouse() {
    return this.type === 'warehouse';
  }

  get isRetail() {
    return this.type === 'retail';
  }
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    type: {
      type: DataTypes.ENUM(...LOCATION_TYPES),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'locations',
  }
);
