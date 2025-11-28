import { NextResponse } from "next/server";

const BASE_URL = `${process.env.URL_CATEGORY}/api/categorias`;
console.log('BASE_URL:', BASE_URL); // ← TEMPORAL para debug
// GET — Obtener categorías
export async function GET() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        return NextResponse.json(
            { message: "Error connecting to Category microservice" },
            { status: 500 }
        );
    }
}

// POST — Crear categoría
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        return NextResponse.json(
            { message: "Error creating category" },
            { status: 500 }
        );
    }
}
