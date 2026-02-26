import { Transfer } from "../db/models/Transfer";
import { TransferItem } from "../db/models/TransferItem";
import { Inventory } from "../db/models/Inventory";
import { sequelize } from "../config/database";
import { Location } from "../db/models/Location";
export class TransferService {
    static async createTransfer({ fromLocationId, toLocationId, items, }) {
        if (fromLocationId === toLocationId) {
            throw new Error("fromLocationId and toLocationId must be different");
        }
        return await sequelize.transaction(async (t) => {
            const toLocation = await Location.findByPk(toLocationId, { transaction: t });
            if (!toLocation)
                throw new Error("Destination location not found");
            const currentStock = await Inventory.sum("quantity", {
                where: { locationId: toLocationId },
                transaction: t,
            });
            const totalTransferQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
            if (currentStock + totalTransferQuantity > toLocation.capacity) {
                throw new Error(`Cannot transfer: '${toLocation.name}' capacity exceeded. Max: ${toLocation.capacity}, current: ${currentStock}, trying to add: ${totalTransferQuantity}`);
            }
            const transfer = await Transfer.create({ fromLocationId, toLocationId, status: "pending" }, { transaction: t });
            const transferItems = await Promise.all(items.map((item) => TransferItem.create({ transferId: transfer.id, productId: item.productId, quantity: item.quantity }, { transaction: t })));
            for (const item of items) {
                const inventoryFrom = await Inventory.findOne({
                    where: { productId: item.productId, locationId: fromLocationId },
                    transaction: t,
                });
                if (!inventoryFrom || inventoryFrom.quantity < item.quantity) {
                    throw new Error(`Not enough stock for productId ${item.productId} in fromLocationId ${fromLocationId}`);
                }
                inventoryFrom.quantity -= item.quantity;
                await inventoryFrom.save({ transaction: t });
                const [inventoryTo] = await Inventory.findOrCreate({
                    where: { productId: item.productId, locationId: toLocationId },
                    defaults: { quantity: 0 },
                    transaction: t,
                });
                inventoryTo.quantity += item.quantity;
                await inventoryTo.save({ transaction: t });
            }
            transfer.status = "completed";
            await transfer.save({ transaction: t });
            return { transfer, transferItems };
        });
    }
}
