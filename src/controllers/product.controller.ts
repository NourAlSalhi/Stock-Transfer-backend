import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { successResponse } from "../utils/response";

export class ProductController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      return successResponse(res, products, "Products fetched successfully");
    } catch (err) {
      next(err);
    }
  }
}
