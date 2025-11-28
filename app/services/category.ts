import { Category, CategoryResponse } from "@/app/interfaces/category";

export async function getCategory(): Promise<CategoryResponse> {
    const res = await fetch("/api/categories");

    if (!res.ok) throw new Error("Error loading categories");

    return res.json();
}

export async function createCategory(data: Category): Promise<Category> {
    const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error creating category");

    const result = await res.json();
    return result.data;
}

export async function updateCategory(data: Category): Promise<Category> {
    const res = await fetch(`/api/categories/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error updating category");

    const result = await res.json();
    return result.data;
}

export async function deleteCategory(id: string) {
    const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error deleting category");

    return res.json();
}
