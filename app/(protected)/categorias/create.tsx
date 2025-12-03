'use client';

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput } from "flowbite-react";
import { createCategory } from '@/app/services/category';
import { Category } from '@/app/interfaces/category';
import toast from 'react-hot-toast';

interface Props {
    onCloseModal: () => void;
    openModal: boolean;
    onAddCategory: (category: Category) => void;   // NUEVO
}

export function CreateCategoryComponent({ onCloseModal, openModal, onAddCategory }: Props) {
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // evita refrescar la página
        const data = {
            id: 'null',   // normalmente el backend asigna el id
            nombre: e.target.nombre.value,
        };
        try {
            const result: Category = await createCategory(data);
            onAddCategory(result);

            // Toast de éxito
            toast.success("Categoría agregada correctamente", { duration: 3000 });

            onCloseModal();
        } catch (error) {
            console.error("Error creating category:", error);

            // Toast de error
            toast.error("Error al crear la categoría", { duration: 3000 });
        }
    };

    return (
        <Modal show={openModal} onClose={onCloseModal}>
            <ModalHeader>Agregar Categoría</ModalHeader>
            <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nombre">Nombre de la Categoría</Label>
                        </div>
                        <TextInput id="nombre" type="text" required />
                    </div>

                    <Button type="submit">Guardar</Button>
                </form>
            </ModalBody>
        </Modal>
    );
}
