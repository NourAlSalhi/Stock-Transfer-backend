import { Product } from "../db/models/Product";

export class ProductService {
  static async getAllProducts() {
    return await Product.findAll({
      order: [["id", "ASC"]],
    });
  }
}
