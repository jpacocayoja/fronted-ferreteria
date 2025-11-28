import { NextResponse } from "next/server";

const BASE_URL = `${process.env.URL_SALE}/api/sales`;

// GET — obtener ventas
export async function GET() {
    try {
        const res = await fetch(BASE_URL);

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "Error connecting to SALE microservice" },
            { status: 500 }
        );
    }
}

// POST — registrar venta
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
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating sale" },
            { status: 500 }
        );
    }
}
