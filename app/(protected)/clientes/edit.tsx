"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, TextInput } from "flowbite-react";
import { Client } from '../../interfaces/client';
import { updateClient } from "@/app/api/client"; // debes crearlo en tu API

interface Props {
    onCloseModal: () => void;
    openModal: boolean;
    client: Client | null;
    onUpdateClient: (client: Client) => void;
}

export function EditClientComponent({ onCloseModal, openModal, client, onUpdateClient }: Props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!client) return;

        const updatedData: Client = {
            id: client.id,
            nombre: e.target.nombre.value,
            apellidos: e.target.apellidos.value,
            ci: e.target.ci.value,
            telefono: e.target.telefono.value,
            nit: e.target.nit.value,
        };

        try {
            const result = await updateClient(updatedData);
            onUpdateClient(result); // actualiza la tabla
            onCloseModal();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal show={openModal} onClose={onCloseModal}>
                <ModalHeader>Editar Cliente</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        {/* FILA 1: Nombre - Apellidos */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="nombre">Nombre</Label>
                                </div>
                                <TextInput
                                    id="nombre"
                                    type="text"
                                    defaultValue={client?.nombre}
                                    required
                                />
                            </div>

                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="apellidos">Apellidos</Label>
                                </div>
                                <TextInput
                                    id="apellidos"
                                    type="text"
                                    defaultValue={client?.apellidos}
                                    required
                                />
                            </div>
                        </div>

                        {/* FILA 2: CI - Teléfono */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="ci">CI</Label>
                                </div>
                                <TextInput
                                    id="ci"
                                    type="text"
                                    defaultValue={client?.ci}
                                    required
                                />
                            </div>

                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                </div>
                                <TextInput
                                    id="telefono"
                                    type="text"
                                    defaultValue={client?.telefono}
                                    required
                                />
                            </div>
                        </div>

                        {/* FILA 3: NIT */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nit">NIT</Label>
                            </div>
                            <TextInput
                                id="nit"
                                type="text"
                                defaultValue={client?.nit}
                                required
                            />
                        </div>

                        <Button type="submit">Guardar Cambios</Button>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}
