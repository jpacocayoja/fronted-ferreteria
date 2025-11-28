import { NextResponse } from "next/server";

const BASE_URL = `${process.env.URL_PRODUCT}/api/products`;

// GET — obtener productos
export async function GET() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "Error connecting to PRODUCT microservice" },
            { status: 500 }
        );
    }
}

// POST — crear producto
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Quitamos el id si viene para evitar errores
        const { id, ...data2 } = body;

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data2),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json(
            { message: "Error creating product" },
            { status: 500 }
        );
    }
}
