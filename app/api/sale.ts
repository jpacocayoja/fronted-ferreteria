import { Order, SaleResponse } from "@/app/interfaces/sale"; // Importa las interfaces
import { URL_SALE } from './url';

const baseUrl = `${URL_SALE}/api/sales`;

export async function createSale(data: Order)/* : Promise<any> */ {
    try {
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Error registering sale");
        }

        /* return result; // Esto depende de la respuesta que devuelve la API */
    } catch (err) {
        throw new Error("Error consuming API");
    }
}

export async function getSales(): Promise<SaleResponse> {
    try {
        const res = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        const result: SaleResponse = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Server error");
        }

        return result; // message, data, total
    } catch (err) {
        console.error(" ERROR REAL EN getCategory:", err);
        throw new Error("Error consuming API");
    }
}
