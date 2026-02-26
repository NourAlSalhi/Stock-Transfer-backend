import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, sku FROM products;`
    );
    const [locations] = await queryInterface.sequelize.query(
      `SELECT id, name FROM locations;`
    );

    const warehouse = (locations as any[]).find(
      (l) => l.name === "Main Warehouse"
    );
    const retail = (locations as any[]).find(
      (l) => l.name === "City Retail Store"
    );

    const milk = (products as any[]).find((p) => p.sku === "MILK-001");
    const bread = (products as any[]).find((p) => p.sku === "BREAD-001");
    const eggs = (products as any[]).find((p) => p.sku === "EGGS-001");
    const cheese = (products as any[]).find((p) => p.sku === "CHEESE-001");
    const butter = (products as any[]).find((p) => p.sku === "BUTTER-001");
    const juice = (products as any[]).find((p) => p.sku === "JUICE-001");

    await queryInterface.bulkInsert("inventories", [
      {
        productId: milk.id,
        locationId: warehouse.id,
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: milk.id,
        locationId: retail.id,
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: bread.id,
        locationId: warehouse.id,
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: bread.id,
        locationId: retail.id,
        quantity: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: eggs.id,
        locationId: warehouse.id,
        quantity: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: eggs.id,
        locationId: retail.id,
        quantity: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: cheese.id,
        locationId: warehouse.id,
        quantity: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: butter.id,
        locationId: warehouse.id,
        quantity: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: juice.id,
        locationId: retail.id,
        quantity: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("inventories", {}, {});
  },
};
