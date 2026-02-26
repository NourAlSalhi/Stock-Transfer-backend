import { Request, Response, NextFunction } from "express";
import { TransferService } from "../services/transfer.service";
import { successResponse } from "../utils/response";

export class TransferController {
  static async createTransfer(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromLocationId, toLocationId, items } = req.body;

      const result = await TransferService.createTransfer({
        fromLocationId,
        toLocationId,
        items,
      });

      return successResponse(res, result, "Transfer created successfully", 201);
    } catch (err) {
      next(err);
    }
  }
}
