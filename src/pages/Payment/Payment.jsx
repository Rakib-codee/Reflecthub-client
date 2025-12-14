import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";

// TODO: Replace with your actual Publishable Key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.VITE_PAYMENT_GATEWAY_PK || "pk_test_51Sdxd5KRZQaAnYsd1bvDUoZcUks1ObKypZamGYLnuJzqWRvYp3aFetNU0etDwwpQXgld9QebXtgRw9RafsximIgd00FEcc8lqu";

const Payment = () => {
    const [stripe, setStripe] = useState(null);
    const [stripeLoading, setStripeLoading] = useState(true);
    const [stripeError, setStripeError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const initStripe = async () => {
            try {
                if (!stripePublishableKey) {
                    if (isMounted) setStripeError('Stripe publishable key is missing. Please set VITE_STRIPE_PUBLISHABLE_KEY.');
                    return;
                }

                const stripeInstance = await loadStripe(stripePublishableKey);

                if (!isMounted) return;

                if (!stripeInstance) {
                    setStripeError('Failed to initialize Stripe. Please try again later.');
                    return;
                }

                setStripe(stripeInstance);
            } catch {
                if (!isMounted) return;
                setStripeError('Failed to load Stripe.js. Please check your network/VPN/ad-blocker and try again.');
            } finally {
                if (isMounted) setStripeLoading(false);
            }
        };

        initStripe();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="py-20 px-4">
             <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-primary">Membership Plan</h1>
                <p className="mt-2 text-gray-500">Unlock all premium lessons and features.</p>
             </div>
            
            {stripeLoading ? (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : stripe && !stripeError ? (
                <Elements stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-purple-100">
                    <p className="text-red-600 text-sm">{stripeError || 'Stripe is unavailable right now. Please try again later.'}</p>
                </div>
            )}
        </div>
    );
};

export default Payment;