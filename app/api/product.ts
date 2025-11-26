import { Product } from '@/app/interfaces/product';
import { URL_PRODUCT } from './url';

const baseUrl = `${URL_PRODUCT}/api/products`;

export async function getProduct(): Promise<Product[]> {
    try {
        const res = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.message || "Server error");
        }

        const result: Product[] = await res.json();
        return result;
    } catch (err) {
        console.error("🚨 ERROR REAL EN getProduct:", err);
        throw new Error("Error consuming API");
    }
}

export async function createProduct(data: Product): Promise<Product> {
    try {
        // ❗ Extraemos el id y generamos un nuevo objeto sin el id
        const { id: _, ...data2 } = data; // 👈 body = datos sin el id
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data2),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.message || "Error creating product");
        }

        const result: Product = await res.json();
        return result;
    } catch (err) {
        throw new Error("Error consuming API");
    }
}

export async function updateProduct(data: Product): Promise<Product> {
    try {
        const id = data.id;
        // ❗ Extraemos el id y generamos un nuevo objeto sin el id
        const { id: _, ...data2 } = data; // 👈 body = datos sin el id
        const res = await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data2),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.message || "Error updating product");
        }

        const result: Product = await res.json();
        return result;
    } catch (err) {
        throw new Error("Error consuming API");
    }
}

export async function deleteProduct(id: number) {
    try {
        const res = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.message || "Error deleting product");
        }
    } catch (err) {
        throw new Error("Error consuming API");
    }
}
