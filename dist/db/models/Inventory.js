import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";
import { Product } from "./Product";
import { Location } from "./Location";
export class Inventory extends Model {
    static associate() {
        Inventory.belongsTo(Product, { foreignKey: "productId" });
        Inventory.belongsTo(Location, { foreignKey: "locationId" });
    }
}
Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
}, {
    sequelize,
    tableName: "inventories",
    indexes: [
        {
            unique: true,
            fields: ["productId", "locationId"],
        },
    ],
});
