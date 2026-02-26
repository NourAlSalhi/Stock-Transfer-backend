import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    const [locations] = await queryInterface.sequelize.query(
      `SELECT id, name FROM locations;`
    );

    const fromLocation = (locations as any[]).find(
      (l) => l.name === "Main Warehouse"
    );
    const toLocation = (locations as any[]).find(
      (l) => l.name === "City Retail Store"
    );

    await queryInterface.bulkInsert("transfers", [
      {
        fromLocationId: fromLocation.id,
        toLocationId: toLocation.id,
        status: "completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const [transfers] = await queryInterface.sequelize.query(
      `SELECT id FROM transfers 
       WHERE "fromLocationId" = ${fromLocation.id} 
         AND "toLocationId" = ${toLocation.id} 
       ORDER BY "createdAt" DESC LIMIT 1;`
    );
    
    const transferId = (transfers as any[])[0].id;

    const [products] = await queryInterface.sequelize.query(
      `SELECT id, sku FROM products;`
    );

    const milk = (products as any[]).find((p) => p.sku === "MILK-001");
    const bread = (products as any[]).find((p) => p.sku === "BREAD-001");

    await queryInterface.bulkInsert("transfer_items", [
      {
        transferId,
        productId: milk.id,
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        transferId,
        productId: bread.id,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("transfer_items", {}, {});
    await queryInterface.bulkDelete("transfers", {}, {});
  },
};
