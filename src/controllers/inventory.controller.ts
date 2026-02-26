import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services/inventory.service";
import { successResponse } from "../utils/response";

export class InventoryController {
  static async getAllInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { type } = req.query;

      const inventory = await InventoryService.getAllInventory(type as string);

      return successResponse(res, inventory, "Inventory fetched successfully");
    } catch (err) {
      next(err);
    }
  }
}
