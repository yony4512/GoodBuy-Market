import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CrearProducto({ auth }) {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagenes: '',
        detalles: '',
        vendedor: auth.user?.name || '',
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [mostrarPaypal, setMostrarPaypal] = useState(false);

    const handleProductoChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleConfirmarPago = (e) => {
        e.preventDefault();
        // Validación simple
        if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.vendedor) {
            setError('Completa todos los campos obligatorios.');
            return;
        }
        setError('');
        setMostrarPaypal(true);
    };

    const handlePagoExitoso = () => {
        // Convierte las imágenes a array
        const imagenesArray = producto.imagenes
            .split(',')
            .map(url => url.trim())
            .filter(url => url.length > 0);

        router.post('/productos', {
            ...producto,
            imagenes: imagenesArray,
        }, {
            onSuccess: () => {
                setMensaje('Producto creado correctamente');
                setProducto({
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    imagenes: '',
                    detalles: '',
                    vendedor: auth.user?.name || '',
                });
                setMostrarPaypal(false);
            },
            onError: () => setError('Error al crear el producto.'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crear Producto
                </h2>
            }
        >
            <Head title="Crear Producto" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleConfirmarPago} className="space-y-4 mb-8">
                            {/* ...campos del producto... */}
                            <div>
                                <label className="block text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={producto.nombre}
                                    onChange={handleProductoChange}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    value={producto.descripcion}
                                    onChange={handleProductoChange}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Precio</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={producto.precio}
                                    onChange={handleProductoChange}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Imágenes (URLs separadas por coma)</label>
                                <input
                                    type="text"
                                    name="imagenes"
                                    value={producto.imagenes}
                                    onChange={handleProductoChange}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                    placeholder="https://img1.jpg, https://img2.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Detalles</label>
                                <textarea
                                    name="detalles"
                                    value={producto.detalles}
                                    onChange={handleProductoChange}
                                    className="w-full border rounded px-3 py-2 mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Vendedor</label>
                                <input
                                    type="text"
                                    name="vendedor"
                                    value={producto.vendedor}
                                    readOnly
                                    className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            {error && <div className="text-red-600">{error}</div>}
                            {mensaje && <div className="text-green-600">{mensaje}</div>}

                            {!mostrarPaypal && (
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    Confirmar pago
                                </button>
                            )}
                        </form>

                        {mostrarPaypal && (
                            <PayPalScriptProvider options={{ "client-id": "AXoa7GuKdVGCbxn7n9Guq_x9_ttX_bb_5UfbMoY56X5psng454DFfFHsxxhSNkGbZyS_ZuvcrSqONJq1" }}>
                                <PayPalButtons
                                    style={{ layout: 'vertical' }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value:"5.00"
                                                }
                                            }]
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            alert(`Pago completado por ${details.payer.name.given_name}`);
                                            handlePagoExitoso();
                                        });
                                    }}
                                    onCancel={() => setMostrarPaypal(false)}
                                />
                            </PayPalScriptProvider>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}