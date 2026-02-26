import { Inventory } from "../db/models/Inventory";
import { Product } from "../db/models/Product";
import { Location } from "../db/models/Location";
export class InventoryService {
    static async getAllInventory(type) {
        return await Inventory.findAll({
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "sku"],
                },
                {
                    model: Location,
                    attributes: ["id", "name", "type"],
                    where: type ? { type } : undefined,
                    required: !!type,
                },
            ],
            order: [["id", "ASC"]],
        });
    }
}
