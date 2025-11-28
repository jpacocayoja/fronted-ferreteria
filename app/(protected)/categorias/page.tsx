'use client';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
import { useEffect, useState } from 'react';

import { getCategory, deleteCategory } from '@/app/api/category';
import { Category } from '../../interfaces/category';

import { CreateCategoryComponent } from "./create";
import { EditCategoryComponent } from "./edit";

import Swal from 'sweetalert2';

export default function CategoryComponent() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const addCategoryToList = (newCategory: Category) => {
        setCategories(prev => [...prev, newCategory]);
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const result = await getCategory();
                setCategories(result.data);
            } catch (err: any) {
                console.error("Error loading categories", err);
            }
        }
        fetchCategories();
    }, []);

    const handleDelete = (id: string) => {
        Swal.fire({
            title: '¿Deseas eliminar la categoría?',
            text: 'Esta acción es irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#006EFD',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                try {
                    await deleteCategory(id);
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
                setCategories(prev => prev.filter(cat => cat.id !== id));

                Swal.fire({
                    title: 'Categoría eliminada',
                    text: 'La categoría se eliminó correctamente',
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
                    Categorías
                </h1>
                <Button pill onClick={() => setOpenModalCreate(true)}>Agregar</Button>
            </div>

            <Table striped>
                <TableHead>
                    <TableRow>
                        {/*  <TableHeadCell>ID</TableHeadCell> */}
                        <TableHeadCell>Nombre</TableHeadCell>
                        <TableHeadCell>Acciones</TableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody className="divide-y">
                    {categories.map((cat) => (
                        <TableRow key={cat.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {/* <TableCell>{cat.id}</TableCell> */}
                            <TableCell>{cat.nombre}</TableCell>

                            <TableCell className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setCategoryToEdit(cat);
                                        setOpenModalEdit(true);
                                    }}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                                >
                                    Eliminar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Modal Crear */}
            {
                openModalCreate && (
                    <CreateCategoryComponent
                        openModal={openModalCreate}
                        onCloseModal={() => setOpenModalCreate(false)}
                        onAddCategory={addCategoryToList}
                    />
                )
            }

            {/* Modal Editar */}
            {
                openModalEdit && (
                    <EditCategoryComponent
                        openModal={openModalEdit}
                        onCloseModal={() => setOpenModalEdit(false)}
                        category={categoryToEdit}
                        onUpdateCategory={(updated: any) =>
                            setCategories(prev => prev.map(c => c.id === updated.id ? updated : c))
                        }
                    />
                )
            }

        </div>
    );
}


