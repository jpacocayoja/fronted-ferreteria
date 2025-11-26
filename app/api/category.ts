import { Category, CategoryResponse } from '@/app/interfaces/category';
import { URL_CATEGORY } from './url';

const baseUrl = `${URL_CATEGORY}/api/categorias`;
export async function getCategory(): Promise<CategoryResponse> {
    try {
        const res = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        const result: CategoryResponse = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Server error");
        }

        return result; // message, data, total
    } catch (err) {
        console.error("🚨 ERROR REAL EN getCategory:", err);
        throw new Error("Error consuming API");
    }
}

export async function createCategory(data: Category): Promise<Category> {
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
            throw new Error(result?.message || "Error creating category");
        }

        return result.data;
    } catch (err) {
        throw new Error("Error consuming API");
    }
}

export async function updateCategory(data: Category): Promise<Category> {
    try {
        const res = await fetch(`${baseUrl}/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Error updating category");
        }

        return result.data;
    } catch (err) {
        throw new Error("Error consuming API");
    }
}

export async function deleteCategory(id: string) {
    try {
        const res = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Error deleting category");
        }
    } catch (err) {
        throw new Error("Error consuming API");
    }
}
