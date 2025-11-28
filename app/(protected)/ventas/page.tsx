"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/interfaces/product";
import { CartItem } from "@/app/interfaces/sale";
import { getProduct } from "@/app/api/product";
import { CardComponent } from "../../components";
import { CartModal } from "./cartModal";
import { Button } from "flowbite-react";
export default function SaleComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);


    const roundToTwo = (num: number): number => {
        return Math.round(num * 100) / 100;
    };

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
                            total: roundToTwo((item.quantity + 1) * item.price), // 👈 CAMBIO
                        }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: roundToTwo(product.price), // 👈 CAMBIO
                quantity: 1,
                total: roundToTwo(product.price) // 👈 CAMBIO
            }];
        });
    };


    // Función para vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Cambiar cantidad en el carrito
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
                            total: roundToTwo(newQty * item.price) // 👈 CAMBIO
                        };
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[]
        );
    };

    // Filtrado por nombre o descripción
    const filteredProducts = products.filter(product => {
        const term = searchTerm.toLowerCase().trim();
        return product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
    });

    return (
        <div className="h-screen p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Realizar Venta
            </h1>

            {/* Buscador y botón de carrito */}
            <div className="flex items-center gap-4 mb-4 justify-between">
                <input
                    type="text"
                    placeholder="Buscar producto por nombre o descripción..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Button pill
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2"
                >
                    Ver Productos ({cart.length})
                </Button>
            </div>

            {/* Grid de productos */}
            <div className="h-[calc(100vh-160px)] rounded-lg overflow-hidden">
                <div className="h-full overflow-y-auto pt-4 pb-15">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <CardComponent key={product.id} product={product} onAdd={handleAddToCart} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center mt-10">
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