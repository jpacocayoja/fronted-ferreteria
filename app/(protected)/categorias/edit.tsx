'use client';

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput } from "flowbite-react";
import { Category } from '@/app/interfaces/category';
import { updateCategory } from "@/app/services/category"; // debes crearlo en tu API

interface Props {
    onCloseModal: () => void;
    openModal: boolean;
    category: Category | null;
    onUpdateCategory: (category: Category) => void;
}

export function EditCategoryComponent({ onCloseModal, openModal, category, onUpdateCategory }: Props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!category) return;

        const updatedData: Category = {
            id: category.id,
            nombre: e.target.nombre.value,
        };

        try {
            const result = await updateCategory(updatedData);
            onUpdateCategory(result); // actualiza la tabla
            onCloseModal();
        } catch (err) {
            console.error("Error updating category:", err);
        }
    };

    return (
        <Modal show={openModal} onClose={onCloseModal}>
            <ModalHeader>Editar Categoría</ModalHeader>
            <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nombre">Nombre de la Categoría</Label>
                        </div>
                        <TextInput
                            id="nombre"
                            type="text"
                            defaultValue={category?.nombre}
                            required
                        />
                    </div>

                    <Button type="submit">Guardar Cambios</Button>
                </form>
            </ModalBody>
        </Modal>
    );
}
