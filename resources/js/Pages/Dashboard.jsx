import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Dashboard({ auth }) {
    const [form, setForm] = useState({
        nombre: auth.user?.name || '',
        email: auth.user?.email || '',
        direccion: '',
        metodo: 'paypal',
        tarjeta: '',
        expiracion: '',
        cvv: '',
    });
    const [showPayPal, setShowPayPal] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.metodo === 'paypal') {
            if (!form.nombre || !form.email || !form.direccion) {
                setError('Por favor completa todos los campos de PayPal.');
                return;
            }
            setError('');
            setShowPayPal(true);
        } else if (form.metodo === 'tarjeta') {
            if (!form.nombre || !form.tarjeta || !form.expiracion || !form.cvv) {
                setError('Por favor completa todos los campos de Tarjeta.');
                return;
            }
            setError('');
            alert('Pago con tarjeta simulado. (Aquí iría la integración real)');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Checkout de Pago
                </h2>
            }
        >
            <Head title="Pago" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <p className="mb-4 text-gray-700">
                            Completa tus datos para realizar el pago.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Método de pago</label>
                                <select
                                    name="metodo"
                                    value={form.metodo}
                                    onChange={e => {
                                        setShowPayPal(false);
                                        handleChange(e);
                                    }}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="paypal">PayPal</option>
                                    <option value="tarjeta">Tarjeta de crédito</option>
                                </select>
                            </div>

                            {/* Campos para PayPal */}
                            {form.metodo === 'paypal' && (
                                <>
                                    <div>
                                        <label className="block text-gray-700">Nombre completo</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={form.nombre}
                                            readOnly
                                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Correo electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            readOnly
                                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            value={form.direccion}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2 mt-1"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {/* Campos para Tarjeta */}
                            {form.metodo === 'tarjeta' && (
                                <>
                                    <div>
                                        <label className="block text-gray-700">Nombre en la tarjeta</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2 mt-1"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Número de tarjeta</label>
                                        <input
                                            type="text"
                                            name="tarjeta"
                                            value={form.tarjeta}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2 mt-1"
                                            maxLength={16}
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-gray-700">Expiración</label>
                                            <input
                                                type="text"
                                                name="expiracion"
                                                value={form.expiracion}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2 mt-1"
                                                placeholder="MM/AA"
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-gray-700">CVV</label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                value={form.cvv}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2 mt-1"
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {error && <div className="text-red-600">{error}</div>}
                            {!showPayPal && (
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Pagar
                                </button>
                            )}
                        </form>

                        {/* PayPal Buttons solo si el método es PayPal */}
                        {showPayPal && form.metodo === 'paypal' && (
                            <div className="mt-6">
                                                      <PayPalScriptProvider options={{ "client-id": "AXoa7GuKdVGCbxn7n9Guq_x9_ttX_bb_5UfbMoY56X5psng454DFfFHsxxhSNkGbZyS_ZuvcrSqONJq1" }}>
                            <PayPalButtons
                                style={{ layout: 'vertical' }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: "5.00" // Monto de ejemplo
                                            }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        alert(`Pago completado por ${details.payer.name.given_name}`);
                                        // Aquí puedes hacer una petición a tu backend para registrar el pago
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}