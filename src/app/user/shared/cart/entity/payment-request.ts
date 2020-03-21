export interface PaymentRequest {
    client?: number;
    deliveryAddress: string;
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    items: {
        entity: number,
        rowId: number,
        price: number,
    }[];
}
