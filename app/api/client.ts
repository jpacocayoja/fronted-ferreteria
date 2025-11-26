import { ClientResponse, Client } from '@/app/interfaces/client';
import { URL_CLIENT } from './url';

const baseUrl = `${URL_CLIENT}/api/clientes`;
export async function getClient(): Promise<ClientResponse> {
    try {
        const res = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });
        const result: ClientResponse = await res.json();
        if (!res.ok) {
            throw new Error(result?.message || "Error en el servidor");
        }
        return result;   // devuelve message, data, total
    } catch (err) {
        throw new Error("Error al consumir la API");
    }
}

export async function createClient(data: Client): Promise<Client> {
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
        return result.data;
    } catch (err) {
        throw new Error("Error al consumir la API");
    }
}

export async function updateClient(data: Client): Promise<Client> {
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
            throw new Error(result?.message || "Error al actualizar el cliente");
        }

        return result.data; // Aquí devuelves el cliente actualizado
    } catch (err) {
        throw new Error("Error al consumir la API");
    }
}

export async function deleteClient(id: string) {
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
            throw new Error(result?.message || "Error al eliminar el cliente");
        }
    } catch (err) {
        throw new Error("Error al consumir la API");
    }
}

