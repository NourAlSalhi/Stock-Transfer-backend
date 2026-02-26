import { InventoryService } from "../services/inventory.service";
import { successResponse } from "../utils/response";
export class InventoryController {
    static async getAllInventory(req, res, next) {
        try {
            const { type } = req.query;
            const inventory = await InventoryService.getAllInventory(type);
            return successResponse(res, inventory, "Inventory fetched successfully");
        }
        catch (err) {
            next(err);
        }
    }
}
