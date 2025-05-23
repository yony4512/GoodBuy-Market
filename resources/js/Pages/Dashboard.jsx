import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pasarela de Pago - PayPal
                </h2>
            }
        >
            <Head title="Pago con PayPal" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <p className="mb-4 text-gray-700">
                            Realiza un pago para publicar tus productos en el marketplace.
                        </p>

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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
