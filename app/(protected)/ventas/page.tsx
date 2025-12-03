"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/interfaces/product";
import { CartItem } from "@/app/interfaces/sale";
import { getProduct } from "@/app/services/product";
import { CardComponent } from "../../components";
import { CartModal } from "./cartModal";
import { Button } from "flowbite-react";

export default function SaleComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const roundToTwo = (num: number): number => Math.round(num * 100) / 100;

    useEffect(() => {
        async function fetchData() {
            const data = await getProduct();
            setProducts(data);
        }
        fetchData();
    }, []);

    const handleAddToCart = (product: Product) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            total: roundToTwo((item.quantity + 1) * item.price),
                        }
                        : item
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: roundToTwo(product.price),
                    quantity: 1,
                    total: roundToTwo(product.price),
                },
            ];
        });
    };

    const clearCart = () => setCart([]);

    const changeQuantity = (id: number, delta: number) => {
        setCart(prev =>
            prev
                .map(item => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        if (newQty <= 0) return null;
                        return {
                            ...item,
                            quantity: newQty,
                            total: roundToTwo(newQty * item.price),
                        };
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[]
        );
    };

    const filteredProducts = products.filter(product => {
        const term = searchTerm.toLowerCase().trim();
        return (
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    });

    return (
        <div className="
            h-screen p-4 
            bg-gray-50 dark:bg-gray-900 
            text-gray-800 dark:text-gray-100
        ">
            <h1 className="text-2xl font-bold mb-4">
                Realizar Venta
            </h1>

            {/* Buscador y botón de carrito */}
            <div className="flex items-center gap-4 mb-4 justify-between">
                <input
                    type="text"
                    placeholder="Buscar producto por nombre o descripción..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="
                        w-full max-w-md p-2 rounded-md
                        border border-gray-300 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-cyan-500
                    "
                />

                <Button
                    pill
                    onClick={() => setModalOpen(true)}
                    className="
                        px-4 py-2
                        bg-cyan-600 text-white
                        dark:bg-cyan-500
                    "
                >
                    Ver Productos ({cart.length})
                </Button>
            </div>

            {/* Grid contenedor */}
            <div className="
                h-[calc(100vh-160px)]
                rounded-lg 
                overflow-hidden 
                bg-white dark:bg-gray-800
            ">
                <div className="h-full overflow-y-auto pt-4 pb-15">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <CardComponent
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddToCart}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 col-span-full text-center mt-10">
                                No se encontraron productos
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de carrito */}
            <CartModal
                openModal={modalOpen}
                cart={cart}
                onClose={() => setModalOpen(false)}
                changeQuantity={changeQuantity}
                onClearCart={clearCart}
            />
        </div>
    );
}
