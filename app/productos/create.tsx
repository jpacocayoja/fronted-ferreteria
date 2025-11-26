'use client';

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput } from "flowbite-react";
import { Product } from '@/app/interfaces/product';
import { createProduct } from '@/app/api/product';

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
    onAddProduct: (product: Product) => void;
}

export function CreateProductComponent({ openModal, onCloseModal, onAddProduct }: Props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data: Product = {
            id: 0,
            name: e.target.name.value,
            id_category: Number(e.target.id_category.value),
            description: e.target.description.value,
            stock: Number(e.target.stock.value),
            price: Number(e.target.price.value)
        };

        try {
            const result = await createProduct(data);
            onAddProduct(result);
            onCloseModal();
        } catch (err: any) {
            console.error("Error creating product:", err);
        }
    };

    return (
        <Modal show={openModal} onClose={onCloseModal}>
            <ModalHeader>Agregar Producto</ModalHeader>
            <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    {/* FILA 1: Nombre - ID Categoría */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Label htmlFor="name">Nombre</Label>
                            <TextInput id="name" type="text" required />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="id_category">ID Categoría</Label>
                            <TextInput id="id_category" type="number" required />
                        </div>
                    </div>

                    {/* FILA 2: Stock - Precio */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Label htmlFor="stock">Stock</Label>
                            <TextInput id="stock" type="number" required />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="price">Precio</Label>
                            <TextInput id="price" type="number" step="0.01" required />
                        </div>
                    </div>

                    {/* FILA 3: Descripción */}
                    <div>
                        <Label htmlFor="description">Descripción</Label>
                        <TextInput id="description" type="text" required />
                    </div>

                    <Button type="submit">Guardar</Button>
                </form>
            </ModalBody>
        </Modal>
    );
}
