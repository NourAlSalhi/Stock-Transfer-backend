export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert("products", [
            {
                name: "Milk",
                sku: "MILK-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Bread",
                sku: "BREAD-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Eggs",
                sku: "EGGS-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Cheese",
                sku: "CHEESE-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Butter",
                sku: "BUTTER-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Juice",
                sku: "JUICE-001",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("products", {}, {});
    },
};
