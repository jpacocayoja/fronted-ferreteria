export interface Order {
    total: number;
    user_id: number;
    client_id: string;
    details: OrderDetail[];
}

export interface OrderDetail {
    amount: number;
    subtotal: number;
    product_id: number;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export interface SaleResponse {
    status: string;
    message: string;
    data: Sale[];
}

export interface Sale {
    id: number;
    total: number;
    user_id: number;
    client_id: string;
    details: SaleDetails[];
}

export interface SaleDetails {
    id: number;
    sale_id: number;
    amount: number;
    subtotal: number;
    product_id: number;
}
