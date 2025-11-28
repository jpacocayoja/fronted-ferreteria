import { ClientResponse, Client } from "@/app/interfaces/client";

export async function getClient(): Promise<ClientResponse> {
    const res = await fetch("/api/clients");

    if (!res.ok) throw new Error("Error loading clients");

    return res.json();
}

export async function createClient(data: Client): Promise<Client> {
    const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error creating client");

    const result = await res.json();
    return result.data;
}

export async function updateClient(data: Client): Promise<Client> {
    const res = await fetch(`/api/clients/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error updating client");

    const result = await res.json();
    return result.data;
}

export async function deleteClient(id: string) {
    const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error deleting client");

    return res.json();
}
