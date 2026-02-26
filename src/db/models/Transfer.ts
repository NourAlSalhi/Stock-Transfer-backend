import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database';
import { Location } from './Location';
import { TransferItem } from './TransferItem';

export const TRANSFER_STATUS = ['pending', 'completed', 'failed'] as const;
export type TransferStatus = typeof TRANSFER_STATUS[number];

export class Transfer extends Model {
  declare id: number;
  declare fromLocationId: number;
  declare toLocationId: number;
  declare status: TransferStatus;

  static associate() {
    Transfer.belongsTo(Location, { foreignKey: 'fromLocationId', as: 'fromLocation' });
    Transfer.belongsTo(Location, { foreignKey: 'toLocationId', as: 'toLocation' });
    Transfer.hasMany(TransferItem, { foreignKey: 'transferId', as: 'items' });
  }
}

Transfer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fromLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    toLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...TRANSFER_STATUS),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'transfers',
    validate: {
      differentLocations() {
        if (this.fromLocationId === this.toLocationId) {
          throw new Error('fromLocationId and toLocationId must be different');
        }
      },
    },
  }
);
