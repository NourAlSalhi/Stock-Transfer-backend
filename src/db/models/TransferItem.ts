import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Transfer } from "./Transfer";
import { Product } from "./Product";

export class TransferItem extends Model {
  declare id: number;
  declare transferId: number;
  declare productId: number;
  declare quantity: number;

  static associate() {
    TransferItem.belongsTo(Transfer, { foreignKey: "transferId" });
    TransferItem.belongsTo(Product, { foreignKey: "productId" });
  }
}

TransferItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    tableName: "transfer_items",
    indexes: [
      {
        unique: true,
        fields: ["transferId", "productId"],
      },
    ],
  }
);
