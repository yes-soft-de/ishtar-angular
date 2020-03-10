export interface OrderListItem {
    id: number;
    client: number;
    deliveryAddress: string;
    subtotal: number;
    total: number;
    paymentMethod: string;
    orderState: string;
    shippingState: false;
    addingDate: string;
    items: {
        id: number,
        entity: string,
        rowId: number,
        order: number,
        price: number,
        addingDate: string
    }[];
    paymentId: string;
    payerId: string;
}
