'use client';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getClient, deleteClient } from '@/app/api/client';
import { Client } from '../../interfaces/client';
import { CreateClientComponent } from "./create";
import { EditClientComponent } from "./edit";
import Swal from 'sweetalert2';


export default function ClientComponent() {
    const [clients, setClients] = useState<Client[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    const addClientToList = (newClient: Client) => {
        setClients(prev => [...prev, newClient]);
    };


    useEffect(() => {

        async function fetchClient() {
            try {
                const result = await getClient();
                console.log(result);
                setClients(result.data);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                }
            }
        }

        fetchClient();
    }, []);

    const handleDelete = (id: string) => {
        Swal.fire({
            title: '¿Deseas eliminar el cliente?',
            text: 'Esta acción es irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#006EFDFF',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                // Aquí podrías hacer una llamada para eliminar el cliente, pasando el ID
                try {
                    // Llamada a la API para eliminar al cliente
                    await deleteClient(id);
                    return true;  // Si todo sale bien
                } catch (err: any) {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err?.message,
                        confirmButtonColor: '#006EFDFF',
                        confirmButtonText: 'Aceptar'
                    });
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el cliente se elimina con éxito, actualiza la lista de clientes
                setClients(clients.filter((client) => client.id !== id));
                Swal.fire({
                    title: 'Cliente eliminado',
                    text: 'El cliente ha sido eliminado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#0577B0FF',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between p-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-800">
                    Clientes
                </h1>
                <Button pill onClick={() => setOpenModalCreate(true)} >Agregar</Button>
            </div>
            <Table striped>
                <TableHead>
                    <TableRow>
                        {/* <TableHeadCell>ID</TableHeadCell> */}
                        <TableHeadCell>Nombre</TableHeadCell>
                        <TableHeadCell>Apellidos</TableHeadCell>
                        <TableHeadCell>CI</TableHeadCell>
                        <TableHeadCell>Teléfono</TableHeadCell>
                        <TableHeadCell>NIT</TableHeadCell>
                        <TableHeadCell>Acciones</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="divide-y">
                    {clients.map((client) => (
                        <TableRow key={client.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {/*  <TableCell>{client.id}</TableCell> */}
                            <TableCell>{client.nombre}</TableCell>
                            <TableCell>{client.apellidos}</TableCell>
                            <TableCell>{client.ci}</TableCell>
                            <TableCell>{client.telefono}</TableCell>
                            <TableCell>{client.nit}</TableCell>
                            <TableCell className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setClientToEdit(client);   // → PASAS TODOS LOS DATOS
                                        setOpenModalEdit(true);    // → ABRES EL MODAL
                                    }}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(client.id)}
                                    className="font-medium text-red-600 hover:underline dark:text-red-500">
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                openModalCreate && (
                    <CreateClientComponent
                        onCloseModal={() => setOpenModalCreate(false)}
                        openModal={openModalCreate}
                        onAddClient={addClientToList}
                    />
                )
            }

            {
                openModalEdit && (
                    <EditClientComponent
                        openModal={openModalEdit}
                        onCloseModal={() => setOpenModalEdit(false)}
                        client={clientToEdit}
                        onUpdateClient={(updated: any) =>
                            setClients(prev =>
                                prev.map(c => c.id === updated.id ? updated : c)
                            )
                        }
                    />
                )
            }

        </div >
    );
}
