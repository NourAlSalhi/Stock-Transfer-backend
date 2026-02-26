import { Location } from "../db/models/Location";
import { Inventory } from "../db/models/Inventory";
import { Product } from "../db/models/Product";

export class LocationService {
  static async getAllLocationsWithStock() {
    const locations = await Location.findAll({
      include: [
        {
          model: Inventory,
          include: [Product],
        },
      ],
    });

    return locations.map((loc: any) => {
      const totalProducts = loc.Inventories?.reduce(
        (sum: number, inv: any) => sum + inv.quantity,
        0
      ) || 0;

      return {
        id: loc.id,
        name: loc.name,
        type: loc.type,
        capacity: loc.capacity,
        currentStock: totalProducts,
      };
    });
  }
}
