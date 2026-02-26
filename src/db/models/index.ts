import { sequelize } from '../../config/database';
import { Product } from './Product';
import { Location } from './Location';
import { Inventory } from './Inventory';
import { Transfer } from './Transfer';
import { TransferItem } from './TransferItem';

const models = {
  Product,
  Location,
  Inventory,
  Transfer,
  TransferItem,
};

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate();
  }
});

export { sequelize };
export default models;
