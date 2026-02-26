import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
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

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('locations', {}, {});
  },
};
