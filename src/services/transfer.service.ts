import { Transfer } from "../db/models/Transfer";
import { TransferItem } from "../db/models/TransferItem";
import { Inventory } from "../db/models/Inventory";
import { Location } from "../db/models/Location";
import { Product } from "../db/models/Product";
import { sequelize } from "../config/database";
import type { CreateTransferInput } from "../types";

export class TransferService {
  static async createTransfer({
    fromLocationId,
    toLocationId,
    items,
  }: CreateTransferInput) {

    if (fromLocationId === toLocationId) {
      throw new Error("Source and destination locations must be different");
    }

    if (!items || items.length === 0) {
      throw new Error("Transfer must include at least one product");
    }

    return await sequelize.transaction(async (t) => {

      const fromLocation = await Location.findByPk(fromLocationId, { transaction: t });
      if (!fromLocation) throw new Error("Source location not found");

      const toLocation = await Location.findByPk(toLocationId, { transaction: t });
      if (!toLocation) throw new Error("Destination location not found");

      const mergedItems = items.reduce((acc: any[], item) => {
        const existing = acc.find(i => i.productId === item.productId);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);

      const currentStock =
        (await Inventory.sum("quantity", {
          where: { locationId: toLocationId },
          transaction: t,
        })) || 0;

      const totalTransferQuantity = mergedItems.reduce(
        (sum, i) => sum + i.quantity,
        0
      );

      if (currentStock + totalTransferQuantity > toLocation.capacity) {
        throw new Error(
          `Cannot transfer. Location '${toLocation.name}' capacity exceeded. 
          Capacity: ${toLocation.capacity}, 
          Current Stock: ${currentStock}, 
          Attempting to Add: ${totalTransferQuantity}`
        );
      }

      // Create Transfer (pending)
      const transfer = await Transfer.create(
        { fromLocationId, toLocationId, status: "pending" },
        { transaction: t }
      );

      // Process each product
      for (const item of mergedItems) {

        const inventoryFrom = await Inventory.findOne({
          where: {
            productId: item.productId,
            locationId: fromLocationId,
          },
          include: [{ model: Product }],
          transaction: t,
        });

        if (!inventoryFrom) {
          throw new Error(
            `Product not found in source location '${fromLocation.name}'`
          );
        }

        if (inventoryFrom.quantity < item.quantity) {
          throw new Error(
            `Not enough stock for product '${inventoryFrom.Product?.name}' 
            in location '${fromLocation.name}'. 
            Available: ${inventoryFrom.quantity}, 
            Requested: ${item.quantity}`
          );
        }

        // Deduct from source
        inventoryFrom.quantity -= item.quantity;
        await inventoryFrom.save({ transaction: t });

        // Add to destination
        const [inventoryTo] = await Inventory.findOrCreate({
          where: {
            productId: item.productId,
            locationId: toLocationId,
          },
          defaults: { quantity: 0 },
          transaction: t,
        });

        inventoryTo.quantity += item.quantity;
        await inventoryTo.save({ transaction: t });

        // Create TransferItem
        await TransferItem.create(
          {
            transferId: transfer.id,
            productId: item.productId,
            quantity: item.quantity,
          },
          { transaction: t }
        );
      }

      // Complete Transfer
      transfer.status = "completed";
      await transfer.save({ transaction: t });

      return {
        message: "Transfer completed successfully",
        transfer,
      };
    });
  }
}