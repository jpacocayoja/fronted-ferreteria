import { NextRequest, NextResponse } from "next/server";

// PUT - Actualizar un cliente
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Promise
) {
    try {
        const { id } = await params; // ← await params
        const URL = `${process.env.URL_CLIENT}/api/clientes/${id}`; // ← usar id
        const body = await req.json();

        const res = await fetch(URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error updating client:", err);
        return NextResponse.json(
            { message: "Error updating client" },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar un cliente
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Promise
) {
    try {
        const { id } = await params; // ← await params
        const URL = `${process.env.URL_CLIENT}/api/clientes/${id}`; // ← usar id

        const res = await fetch(URL, {
            method: "DELETE",
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error deleting client:", err);
        return NextResponse.json(
            { message: "Error deleting client" },
            { status: 500 }
        );
    }
}