"use client";

import { Modal, ModalHeader, ModalBody, Button } from "flowbite-react";
import { CartItem, Order, OrderDetail } from "@/app/interfaces/sale";
import { createSale } from '@/app/services/sale';
import { useEffect, useState } from 'react';
import { getClient } from '@/app/services/client';
import { Client } from '../../interfaces/client';
import { Select, Label } from "flowbite-react";


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
            onClose();
            onClearCart();
        } catch (error) {
            console.error("Error creating sale:", error);
        }
    };

    useEffect(() => {
        async function fetchClient() {
            try {
                const result = await getClient();
                setClients(result.data);

                // Seleccionar automáticamente el primer cliente
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
        <Modal show={openModal} onClose={onClose}>
            <ModalHeader>Venta de Productos</ModalHeader>

            <ModalBody className="overscroll-y-none overflow-y-hidden">

                {cart.length === 0 ? (
                    <p className="text-gray-500">No hay productos</p>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-dashed border-b pb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Bs {item.price} c/u</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => changeQuantity(item.id, -1)}
                                            className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                                        >
                                            -
                                        </button>

                                        <span className="w-8 text-center">{item.quantity}</span>

                                        <button
                                            onClick={() => changeQuantity(item.id, 1)}
                                            className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold text-right w-28">Bs {item.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center font-bold text-lg mt-2 mb-2 border-t">
                    <span>Total:</span>
                    <span>Bs {total}</span>
                </div>

                {/* Select + Botones */}
                <div className="mb-2 flex justify-between items-center gap-4">

                    {/* SELECT DE CLIENTE */}
                    <div className="w-1/3">
                        {/*     <Label htmlFor="client">Clientes</Label> */}
                        <Select
                            id="client"
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="mt-1"
                        >
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.nombre} {client.apellidos}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* BOTONES */}
                    <div className="flex items-center gap-2">
                        <Button color="alternative" pill onClick={onClearCart}>
                            Borrar
                        </Button>

                        <Button
                            pill
                            onClick={handleSubmit}
                            disabled={cart.length === 0}
                            className={cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : ""}
                        >
                            Registrar
                        </Button>
                    </div>

                </div>
            </ModalBody>

        </Modal>
    );
}
