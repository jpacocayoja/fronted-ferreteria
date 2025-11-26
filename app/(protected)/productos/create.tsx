'use client';

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput, Select } from "flowbite-react";
import { Product } from '@/app/interfaces/product';
import { Category } from '@/app/interfaces/category';
import { createProduct } from '@/app/api/product';

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
    onAddProduct: (product: Product) => void;
    categories: Category[];  // Recibimos las categorías desde el componente padre
}

export function CreateProductComponent({ openModal, onCloseModal, onAddProduct, categories }: Props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data: Product = {
            id: 0,
            name: e.target.name.value,
            id_category: e.target.id_category.value,  // Usamos el id de la categoría seleccionada
            description: e.target.description.value,
            stock: Number(e.target.stock.value),
            price: Number(e.target.price.value)
        };

        try {
            // Crear el producto usando la API
            const result = await createProduct(data);
            onAddProduct(result); // Actualizar la lista de productos
            onCloseModal(); // Cerrar el modal después de agregar el producto
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
                            <Label htmlFor="id_category">Categoría</Label>
                            <Select id="id_category" required>
                                {/* Iteramos sobre las categorías pasadas como prop */}
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.nombre}
                                    </option>
                                ))}
                            </Select>
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
