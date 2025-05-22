import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password - GoodBuy Market" />
            <div className="max-w-md mx-auto">
                <header className="flex items-center justify-center mb-6">
                    <div className="flex items-center hover:scale-105 transition-transform duration-300">
                        <svg
                            className="h-12 w-auto text-[#4CAF50] lg:h-16 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 5H22L20.595 7.903C20.2147 8.59417 19.6989 9.20329 19.076 9.693C18.4531 10.1827 17.7359 10.5434 16.966 10.753L16 11H13L16 22H18L22 9H19C18.7348 9 18.4804 8.89464 18.2929 8.70711C18.1054 8.51957 18 8.26522 18 8V6C18 5.73478 18.1054 5.48043 18.2929 5.29289C18.4804 5.10536 18.7348 5 19 5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M15 5H2C1.73478 5 1.48043 5.10536 1.29289 5.29289C1.10536 5.48043 1 5.73478 1 6V18C1 18.2652 1.10536 18.5196 1.29289 18.7071C1.48043 18.8946 1.73478 19 2 19H4.586C4.85122 19 5.10557 19.1054 5.29311 19.2929C5.48064 19.4804 5.586 19.7348 5.586 20V22C5.586 22.2652 5.69136 22.5196 5.87889 22.7071C6.06643 22.8946 6.32078 23 6.586 23H8.586C8.85122 23 9.10557 22.8946 9.29311 22.7071C9.48064 22.5196 9.586 22.2652 9.586 22V20C9.586 19.7348 9.69136 19.4804 9.87889 19.2929C10.0664 19.1054 10.3208 19 10.586 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5ZM14 17H3C2.73478 17 2.48043 16.8946 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H14C14.2652 7 14.5196 7.10536 14.7071 7.29289C14.8946 7.48043 15 7.73478 15 8V16C15 16.2652 14.8946 16.5196 14.7071 16.7071C14.5196 16.8946 14 17 14 17Z"
                                fill="currentColor"
                            />
                        </svg>
                        <h1 className="ml-2 text-2xl font-bold text-[#4CAF50] lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]">
                            GoodBuy Market
                        </h1>
                    </div>
                </header>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton
                            className="ms-4 bg-[#4CAF50] hover:bg-[#43A047] focus:ring-[#4CAF50]"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
