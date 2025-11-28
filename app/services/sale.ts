import { Order, SaleResponse } from "@/app/interfaces/sale";

export async function createSale(data: Order) {
    const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error registering sale");

    return res.json();
}

export async function getSales(): Promise<SaleResponse> {
    const res = await fetch("/api/sales");

    if (!res.ok) throw new Error("Error loading sales");

    return res.json();
}
