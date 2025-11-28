import { NextResponse } from "next/server";

const BASE_URL = `${process.env.URL_AUTH}/api/auth/login`;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data?.message || "Invalid credentials" },
                { status: res.status }
            );
        }

        // 🔐 OPCIONAL → si quieres guardar token en cookie httpOnly
        // if (data.token) {
        //     const response = NextResponse.json(data, { status: 200 });
        //     response.cookies.set("token", data.token, {
        //         httpOnly: true,
        //         path: "/",
        //     });
        //     return response;
        // }

        return NextResponse.json(data, { status: 200 });

    } catch (err) {
        return NextResponse.json(
            { message: "Auth microservice error" },
            { status: 500 }
        );
    }
}
