'use client';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getSales } from '@/app/api/sale';
import { getClient } from '@/app/api/client';
import { Sale } from '@/app/interfaces/sale';
import { Client } from '@/app/interfaces/client';
import { SaleDetailModal } from './saleDetailModal';

export default function ReportComponent() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resultSale = await getSales();
                setSales(resultSale.data);

                const resultClient = await getClient();
                setClients(resultClient.data);
            } catch (err: any) {
                console.error("Error loading sales:", err);
            }
        }
        fetchData();
    }, []);

    const handleOpenModal = (sale: Sale) => {
        setSelectedSale(sale);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSale(null);
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between p-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-800">
                    Reporte de Ventas
                </h1>
            </div>

            <Table striped>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>TOTAL</TableHeadCell>
                        <TableHeadCell>CLIENTE</TableHeadCell>
                        <TableHeadCell>ACCIONES</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="divide-y">
                    {sales.map((sale) => {
                        const cliente = clients.find(c => c.id === sale.client_id);

                        return (
                            <TableRow key={sale.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>{sale.id}</TableCell>
                                <TableCell>{sale.total} Bs</TableCell>
                                <TableCell>{cliente ? `${cliente.nombre} ${cliente.apellidos}` : "Cliente no encontrado"}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleOpenModal(sale)}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Ver Detalles
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {/* Modal siempre renderizado, show controla la visibilidad */}
            <SaleDetailModal
                openModal={openModal}
                onClose={handleCloseModal}
                sale={selectedSale ?? { id: 0, total: 0, user_id: 0, client_id: '', details: [] }} // fallback seguro
            />
        </div>
    );
}
