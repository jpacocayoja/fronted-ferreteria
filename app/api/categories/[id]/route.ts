import { NextRequest, NextResponse } from "next/server";

// PUT - Actualizar una categoría
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Cambio aquí: Promise
) {
    try {
        const { id } = await params; // ← await params
        const url = `${process.env.URL_CATEGORY}/api/categorias/${id}`; // ← usar id
        const body = await req.json();

        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error updating category:", err);
        return NextResponse.json(
            { message: "Error updating category" },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar una categoría
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Cambio aquí: Promise
) {
    try {
        const { id } = await params; // ← await params
        const url = `${process.env.URL_CATEGORY}/api/categorias/${id}`; // ← usar id

        const res = await fetch(url, { method: "DELETE" });
        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error deleting category:", err);
        return NextResponse.json(
            { message: "Error deleting category" },
            { status: 500 }
        );
    }
}