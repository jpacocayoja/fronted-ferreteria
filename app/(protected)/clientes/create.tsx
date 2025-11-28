"use client";

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput } from "flowbite-react";
import { createClient } from '@/app/services/client';
import { Client } from '../../interfaces/client';

interface Props {
    onCloseModal: () => void;
    openModal: boolean;
    onAddClient: (client: Client) => void;   // NUEVO
}
export function CreateClientComponent({ onCloseModal, openModal, onAddClient }: Props) {
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // evita refrescar la página
        const data = {
            id: 'null',
            nombre: e.target.nombre.value,
            apellidos: e.target.apellidos.value,
            ci: e.target.ci.value,
            telefono: e.target.telefono.value,
            nit: e.target.nit.value,
        };
        try {
            const result: Client = await createClient(data);
            onAddClient(result);
            onCloseModal();
        } catch (error) {
        }
    };

    return (
        <>
            <Modal show={openModal} onClose={onCloseModal}>
                <ModalHeader>Agregar Cliente</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        {/* FILA 1: Nombre - Apellidos */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="nombre">Nombre</Label>
                                </div>
                                <TextInput id="nombre" type="text" required />
                            </div>

                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="apellidos">Apellidos</Label>
                                </div>
                                <TextInput id="apellidos" type="text" required />
                            </div>
                        </div>

                        {/* FILA 2: CI - Teléfono */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="ci">CI</Label>
                                </div>
                                <TextInput id="ci" type="text" required />
                            </div>

                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                </div>
                                <TextInput id="telefono" type="text" required />
                            </div>
                        </div>

                        {/* FILA 3: NIT */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nit">NIT</Label>
                            </div>
                            <TextInput id="nit" type="text" required />
                        </div>

                        <Button type="submit">Guardar</Button>
                    </form>


                </ModalBody>
            </Modal>
        </>
    );
}
