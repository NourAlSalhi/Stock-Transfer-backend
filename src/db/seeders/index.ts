import productSeeder from "./productSeeder";
import locationSeeder from "./locationSeeder";
import inventorySeeder from "./inventorySeeder";
import transferSeeder from "./transferSeeder";
import { sequelize } from "../../config/database";

export const runSeeders = async () => {
  await productSeeder.up(sequelize.getQueryInterface());
  await locationSeeder.up(sequelize.getQueryInterface());
  await inventorySeeder.up(sequelize.getQueryInterface());
  await transferSeeder.up(sequelize.getQueryInterface());
};
