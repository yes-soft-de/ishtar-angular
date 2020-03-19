export interface PendingTransactionListItem {
  client: number;
  deliveryAddress: string;
  subtotal: string;
  total: string;
  paymentMethod: string;
  orderState: string;
  shippingState: boolean;
  addingDate: string;
  items: [{ rowId: number, entity: number }];
}
