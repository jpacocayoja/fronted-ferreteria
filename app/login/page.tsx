"use client";

import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { login } from "@/app/api/auth";   // <--- IMPORTANTE
import { useRouter } from "next/navigation";

export default function Component() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login({ userName, password });

            // Guarda el token (puede ser cookie o localStorage)
            /*         localStorage.setItem("token", result.token); */

            // Redirige al dashboard (o donde quieras)
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message || "Error iniciando sesión");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                {/* Título */}
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    LOGIN
                </h1>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-center mb-3">{error}</p>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1">User Name</Label>
                        </div>
                        <TextInput
                            id="email1"
                            type="text"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Your password</Label>
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </div>
    );
}
