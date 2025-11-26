import { LoginRequest, LoginResponse } from '@/app/interfaces/auth';
import { URL_AUTH } from './url';

const baseUrl = `${URL_AUTH}/api/auth/login`;
export async function login(data: LoginRequest)/* : Promise<LoginResponse> */ {
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
            // Si la API devuelve un error distinto a 2xx
            throw new Error(result?.message || `Error ${res.status}`);
        }

        // Si todo salió bien, devolvemos el token
        /* return result as LoginResponse; */
    } catch (err) {
        console.error("Error en login:", err);
        throw new Error("Credenciales incorrectos");
    }
}