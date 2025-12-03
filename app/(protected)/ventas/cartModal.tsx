'use client';

import { Modal, ModalHeader, ModalBody, Button, Select } from "flowbite-react";
import { CartItem, Order, OrderDetail } from "@/app/interfaces/sale";
import { createSale } from '@/app/services/sale';
import { useEffect, useState } from 'react';
import { getClient } from '@/app/services/client';
import { Client } from '../../interfaces/client';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    openModal: boolean;
    onClose: () => void;
    cart: CartItem[];
    changeQuantity: (id: number, delta: number) => void;
    onClearCart: () => void;
}

export function CartModal({ openModal, onClose, cart, changeQuantity, onClearCart }: Props) {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>("");

    const handleSubmit = async () => {
        if (!selectedClient) return;

        const data: Order = {
            total: total,
            user_id: 1,
            client_id: selectedClient,
            details: cart.map((item: CartItem): OrderDetail => ({
                amount: item.quantity,
                subtotal: item.total,
                product_id: item.id
            }))
        };

        try {
            await createSale(data);
            toast.success("Venta registrada correctamente", { duration: 3000 });
            onClose();
            onClearCart();
        } catch (error) {
            console.error("Error creating sale:", error);
            toast.error("Error al registrar la venta", { duration: 3000 });
        }
    };

    useEffect(() => {
        async function fetchClient() {
            try {
                const result = await getClient();
                setClients(result.data);

                if (result.data.length > 0) {
                    setSelectedClient(result.data[0].id.toString());
                }

            } catch (err) {
                console.error("Error fetching clients:", err);
            }
        }

        fetchClient();
    }, []);

    const roundToTwo = (num: number): number => Math.round(num * 100) / 100;
    const total = roundToTwo(cart.reduce((acc, item) => acc + item.total, 0));

    return (
        <>
            {/* Toaster global */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: { fontSize: '14px' },
                    success: { style: { background: 'green', color: 'white' } },
                    error: { style: { background: 'red', color: 'white' } },
                }}
            />

            <Modal show={openModal} onClose={onClose} className="dark:bg-gray-900 dark:text-gray-100">
                <ModalHeader className="dark:text-gray-100">Venta de Productos</ModalHeader>
                <ModalBody className="overscroll-y-none overflow-y-hidden">

                    {cart.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No hay productos</p>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-dashed border-b border-gray-300 dark:border-gray-700 pb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Bs {item.price} c/u</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex justify-center items-center">
                                            <button
                                                onClick={() => changeQuantity(item.id, -1)}
                                                className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => changeQuantity(item.id, 1)}
                                                className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="font-bold text-right w-28 dark:text-gray-100">Bs {item.total}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between items-center font-bold text-lg mt-2 mb-2 border-t border-gray-300 dark:border-gray-700 dark:text-gray-100">
                        <span>Total:</span>
                        <span>Bs {total}</span>
                    </div>

                    <div className="mb-2 flex justify-between items-center gap-4">
                        <div className="w-1/3">
                            <Select
                                id="client"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                            >
                                {clients.map(client => (
                                    <option key={client.id} value={client.id} className="dark:bg-gray-700 dark:text-gray-100">
                                        {client.nombre} {client.apellidos}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button color="alternative" pill onClick={onClearCart} className="dark:bg-gray-700 dark:text-gray-100">
                                Borrar
                            </Button>
                            <Button
                                pill
                                onClick={handleSubmit}
                                disabled={cart.length === 0}
                                className={`${cart.length === 0 ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : ""} dark:text-gray-100`}
                            >
                                Registrar
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
