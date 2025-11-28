"use client";

import { Product } from "@/app/interfaces/product";

interface Props {
    product: Product;
    onAdd: (product: Product) => void;
}

export function CardComponent({ product, onAdd }: Props) {
    return (
        <div className="w-full max-w-sm bg-gray-100 p-4 rounded-lg shadow-xs">

            {/* ID oculto */}
            <input type="hidden" value={product.id} />

            {/* TÍTULO */}
            <h5 className="text-lg text-heading font-semibold tracking-tight mb-2">
                {product.name}
            </h5>

            {/* DESCRIPCIÓN */}
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {product.description}
            </p>

            {/* PRECIO + BOTÓN */}
            <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-heading">
                    Bs {product.price}
                </span>

                <button
                    onClick={() => onAdd(product)}
                    className="inline-flex items-center bg-gray-200 hover:bg-brand-strong border border-transparent shadow-sm font-medium text-sm px-2 py-2 rounded-lg focus:outline-none focus:ring-2 active:scale-95 transition-transform"
                >
                    <svg
                        className="w-4 h-4 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                        />
                    </svg>
                    Agregar
                </button>

            </div>
        </div>
    );
}
