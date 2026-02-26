export interface TransferItemInput {
  productId: number;
  quantity: number;
}

export interface CreateTransferInput {
  fromLocationId: number;
  toLocationId: number;
  items: TransferItemInput[];
}
