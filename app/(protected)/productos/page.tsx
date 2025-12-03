'use client';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import { useEffect, useState } from 'react';

import { getProduct, deleteProduct } from '@/app/services/product';
import { getCategory } from '@/app/services/category';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { CreateProductComponent } from "./create";
import { EditProductComponent } from "./edit";

import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from "react-icons/fi";

// ProductComponent.tsx
export default function ProductComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); // El estado de categorías
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const addProductToList = (newProduct: Product) => {
        setProducts(prev => [...prev, newProduct]);
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const dataProducts = await getProduct();
                const dataCategories = await getCategory();
                setProducts(dataProducts);
                setCategories(dataCategories.data); // Guardamos las categorías en el estado
            } catch (err: any) {
                console.error("Error loading products", err);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: '¿Deseas eliminar el producto?',
            text: 'Esta acción es irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#006EFD',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                try {
                    await deleteProduct(id);
                    return true;
                } catch (err: any) {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err?.message,
                        confirmButtonColor: '#d33'
                    });
                    return false;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setProducts(prev => prev.filter(p => p.id !== id));
                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto se eliminó correctamente',
                    icon: 'success',
                    confirmButtonColor: '#006EFD'
                });
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between p-2">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-800">
                    Productos
                </h1>
                <Button pill onClick={() => setOpenModalCreate(true)}>Agregar</Button>
            </div>

            <Table striped>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Nombre</TableHeadCell>
                        <TableHeadCell>Categoría</TableHeadCell>
                        <TableHeadCell>Descripción</TableHeadCell>
                        <TableHeadCell>Stock</TableHeadCell>
                        <TableHeadCell>Precio</TableHeadCell>
                        <TableHeadCell>Acciones</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="divide-y">
                    {products.map((p) => {
                        // Buscar la categoría correspondiente
                        const category = categories.find(c => c.id === p.id_category);

                        return (
                            <TableRow
                                key={p.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{category ? category.nombre : "NO TIENE"}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell>{p.stock}</TableCell>
                                <TableCell>{p.price}</TableCell>

                                <TableCell className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setProductToEdit(p); // Establecemos el producto a editar
                                            setOpenModalEdit(true); // Abrimos el modal de edición
                                        }}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                                        title="Editar"
                                    >
                                        <FiEdit size={20} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
                                        title="Eliminar"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {/* Modal Crear Producto */}
            {openModalCreate && (
                <CreateProductComponent
                    openModal={openModalCreate}
                    onCloseModal={() => setOpenModalCreate(false)}
                    onAddProduct={addProductToList}
                    categories={categories}
                />
            )}

            {/* Modal Editar Producto */}
            {openModalEdit && (
                <EditProductComponent
                    openModal={openModalEdit}
                    onCloseModal={() => setOpenModalEdit(false)}
                    product={productToEdit}  // Pasamos el producto a editar
                    onUpdateProduct={(updated: Product) =>
                        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
                    }
                    categories={categories}
                />
            )}
        </div>
    );
}

