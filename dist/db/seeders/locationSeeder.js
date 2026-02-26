export default {
    async up(queryInterface) {
        await queryInterface.bulkInsert('locations', [
            {
                name: 'Main Warehouse',
                type: 'warehouse',
                capacity: 1000,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'City Retail Store',
                type: 'retail',
                capacity: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('locations', {}, {});
    },
};
