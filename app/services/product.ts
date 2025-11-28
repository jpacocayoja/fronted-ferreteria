import { Product } from "@/app/interfaces/product";

export async function getProduct(): Promise<Product[]> {
    const res = await fetch("/api/products");

    if (!res.ok) throw new Error("Error loading products");

    return res.json();
}

export async function createProduct(data: Product): Promise<Product> {
    const { id, ...data2 } = data; // limpiamos id si viene del formulario

    const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data2),
    });

    if (!res.ok) throw new Error("Error creating product");

    return res.json();
}

export async function updateProduct(data: Product): Promise<Product> {
    const { id, ...data2 } = data;

    const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data2),
    });

    if (!res.ok) throw new Error("Error updating product");

    return res.json();
}

export async function deleteProduct(id: number) {
    const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error deleting product");

    return res.json();
}
