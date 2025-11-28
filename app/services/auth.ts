import { LoginRequest, LoginResponse } from "@/app/interfaces/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result?.message || "Invalid credentials");
    }

    return result as LoginResponse;
}
