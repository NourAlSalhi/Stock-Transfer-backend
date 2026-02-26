import { ProductService } from "../services/product.service";
import { successResponse } from "../utils/response";
export class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            return successResponse(res, products, "Products fetched successfully");
        }
        catch (err) {
            next(err);
        }
    }
}
