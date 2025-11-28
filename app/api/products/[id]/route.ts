import { NextRequest, NextResponse } from "next/server";

// PUT - Actualizar un producto
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Promise
) {
    try {
        const { id: paramId } = await params; // ← await params (renombrado para evitar conflicto)
        const URL = `${process.env.URL_PRODUCT}/api/products/${paramId}`; // ← usar paramId
        const body = await req.json();

        const { id, ...data2 } = body;  // Quitamos el id del body antes de enviarlo

        const res = await fetch(URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data2),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error updating product:", err);
        return NextResponse.json(
            { message: "Error updating product" },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar un producto
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← Promise
) {
    try {
        const { id } = await params; // ← await params
        const URL = `${process.env.URL_PRODUCT}/api/products/${id}`; // ← usar id

        const res = await fetch(URL, { method: "DELETE" });
        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("Error deleting product:", err);
        return NextResponse.json(
            { message: "Error deleting product" },
            { status: 500 }
        );
    }
}