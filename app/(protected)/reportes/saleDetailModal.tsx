'use client';

import { Modal, ModalHeader, ModalBody, Table, TableHead, TableRow, TableHeadCell, TableBody, TableCell, Button } from "flowbite-react";
import { useEffect, useState } from 'react';
import { Sale, SaleDetails } from '@/app/interfaces/sale';
import { Product } from '@/app/interfaces/product';
import { getProduct } from '@/app/api/product';

interface Props {
    openModal: boolean;
    onClose: () => void;
    sale: Sale;
}

export function SaleDetailModal({ openModal, onClose, sale }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProduct();
                setProducts(data); // Asumimos que getProduct() devuelve Product[]
            } catch (err: any) {
                console.error("Error loading products:", err);
            }
        }

        fetchProducts();
    }, []);

    const getProductName = (id: number) => {
        const product = products.find(p => p.id === id);
        return product ? product.name : "Producto no encontrado";
    };

    return (
        <Modal show={openModal} onClose={onClose} size="2xl">
            <ModalHeader>Detalles de la Venta #{sale.id}</ModalHeader>
            <ModalBody>
                {sale.details.length === 0 ? (
                    <p>No hay detalles de esta venta.</p>
                ) : (
                    <div className="max-h-96 overflow-y-auto">
                        <Table striped>
                            <TableHead>
                                <TableRow>
                                    {/* <TableHeadCell>ID</TableHeadCell> */}
                                    <TableHeadCell>PROUCTO</TableHeadCell>
                                    <TableHeadCell>CANTIDAD</TableHeadCell>
                                    <TableHeadCell>SUBTOTAL</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {sale.details.map((detail: SaleDetails) => (
                                    <TableRow key={detail.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        {/* <TableCell>{detail.id}</TableCell> */}
                                        <TableCell>{getProductName(detail.product_id)}</TableCell>
                                        <TableCell>{detail.amount}</TableCell>
                                        <TableCell>{detail.subtotal} Bs</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {/*  <div className="flex justify-end mt-4">
                    <Button color="gray" onClick={onClose}>Cerrar</Button>
                </div> */}
            </ModalBody>
        </Modal>
    );
}
