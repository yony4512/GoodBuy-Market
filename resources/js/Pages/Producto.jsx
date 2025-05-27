import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Producto({ producto = []}) {
 

    const imagenes = producto.imagen ? [producto.imagen] : [];
    const [fotoPrincipal, setFotoPrincipal] = useState(imagenes[0] || '');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detalles del Producto
                </h2>
            }
        >
            <Head title={producto.nombre} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 flex flex-col md:flex-row gap-8">
                        {/* Galería de imágenes */}
                        <div className="md:w-1/2 flex flex-col items-center">
                            {fotoPrincipal ? (
                                <img
                                    src={fotoPrincipal}
                                    alt={producto.nombre}
                                    className="w-full h-80 object-cover rounded mb-4 border"
                                />
                            ) : (
                                <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded mb-4 border text-gray-400">
                                    Sin imagen
                                </div>
                            )}
                            {imagenes.length > 1 && (
                                <div className="flex gap-2">
                                    {imagenes.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Miniatura ${idx + 1}`}
                                            className={`w-20 h-20 object-cover rounded cursor-pointer border ${fotoPrincipal === img ? 'border-blue-500' : 'border-gray-300'}`}
                                            onClick={() => setFotoPrincipal(img)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Detalles del producto */}
                        <div className="md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold mb-2">{producto.nombre}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    Vendido por: <span className="font-semibold">{producto.vendedor}</span>
                                </p>
                                <p className="text-gray-700 mb-4">{producto.descripcion}</p>
                                <span className="text-2xl font-semibold text-green-600 mb-4 block">
                                    ${producto.precio}
                                </span>
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-1">Detalles:</h4>
                                    <p className="text-gray-600">{producto.detalles}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                                    onClick={() => alert('Funcionalidad de mensaje próximamente')}
                                >
                                    Enviar Mensaje
                                </button>
                                <Link
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    href={route('dashboard')}
                                >
                                    Comprar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}