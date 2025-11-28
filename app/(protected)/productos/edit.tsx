'use client';

import { Button, Modal, ModalBody, ModalHeader, Label, TextInput, Select } from "flowbite-react";
import { Product } from '@/app/interfaces/product';
import { Category } from '@/app/interfaces/category';
import { updateProduct } from '@/app/services/product';

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
    product: Product | null;
    onUpdateProduct: (product: Product) => void;
    categories: Category[];  // Recibimos las categorías desde el componente padre
}

export function EditProductComponent({ openModal, onCloseModal, product, onUpdateProduct, categories }: Props) {

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!product) return;

        const updatedData: Product = {
            id: product.id,
            name: e.target.name.value,
            id_category: e.target.id_category.value,  // Usamos el id de la categoría seleccionada
            description: e.target.description.value,
            stock: Number(e.target.stock.value),
            price: Number(e.target.price.value)
        };

        try {
            const result = await updateProduct(updatedData);
            onUpdateProduct(result); // Actualizar el producto en la lista
            onCloseModal(); // Cerrar el modal después de actualizar el producto
        } catch (err: any) {
            console.error("Error updating product:", err);
        }
    };

    return (
        <Modal show={openModal} onClose={onCloseModal}>
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    {/* FILA 1: Nombre - ID Categoría */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Label htmlFor="name">Nombre</Label>
                            <TextInput id="name" type="text" defaultValue={product?.name} required />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="id_category">Categoría</Label>
                            <Select id="id_category" required defaultValue={product?.id_category}>
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
                            <TextInput id="stock" type="number" defaultValue={product?.stock} required />
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="price">Precio</Label>
                            <TextInput id="price" type="number" step="0.01" defaultValue={product?.price} required />
                        </div>
                    </div>

                    {/* FILA 3: Descripción */}
                    <div>
                        <Label htmlFor="description">Descripción</Label>
                        <TextInput id="description" type="text" defaultValue={product?.description} required />
                    </div>

                    <Button type="submit">Guardar Cambios</Button>
                </form>
            </ModalBody>
        </Modal>
    );
}
