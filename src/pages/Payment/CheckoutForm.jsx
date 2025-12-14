import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // We will use Secure later
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [intentLoading, setIntentLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const price = 1500; // Price in BDT (or cents if USD)

    // 1. Create Payment Intent on Component Mount
    useEffect(() => {
        let isMounted = true;
        setIntentLoading(true);
        setError('');

        axiosPublic.post('/create-payment-intent', { price })
            .then(res => {
                const secret = res?.data?.clientSecret;
                if (isMounted) {
                    if (!secret) {
                        setError('Failed to initialize payment. Please try again later.');
                        setClientSecret('');
                        return;
                    }
                    setClientSecret(secret);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError('Failed to initialize payment. Please check your server and try again.');
                    setClientSecret('');
                }
            })
            .finally(() => {
                if (isMounted) setIntentLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [axiosPublic]);

    // 2. Handle Form Submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;
        if (!clientSecret) {
            setError('Payment is not ready yet. Please wait a moment and try again.');
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) return;

        setProcessing(true);
        setError('');

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (error) {
                console.log('payment error', error);
                setError(error.message);
                return;
            } else {
                console.log('payment method', paymentMethod);
            }

            // 3. Confirm Payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                console.log('confirm error', confirmError);
                setError(confirmError.message || 'Payment confirmation failed.');
                return;
            }

            console.log('payment intent', paymentIntent);

            if (paymentIntent?.status !== 'succeeded') {
                setError('Payment did not succeed. Please try again.');
                return;
            }

            setTransactionId(paymentIntent.id);

            // 4. Save Payment to Database & Update User Role
            const payment = {
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: new Date(), // utc date convert. use moment js to display
                status: 'paid'
            }

            try {
                const res = await axiosPublic.post('/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful! You are now Premium.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/profile');
                } else {
                    setError('Payment succeeded, but saving the payment failed. Please contact support.');
                }
            } catch (e) {
                console.log('save payment error', e);
                setError('Payment succeeded, but saving the payment failed. Please try again later.');
            }
        } catch (e) {
            console.log('checkout error', e);
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-purple-100">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Upgrade to Premium</h2>
            <div className="mb-4">
                <p className="text-gray-600 mb-2">Total Amount: <span className="font-bold">৳1500</span></p>
                <div className="border p-4 rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            
            <button className="btn btn-primary w-full text-white" type="submit" disabled={!stripe || !clientSecret || intentLoading || processing}>
                {processing ? 'Processing...' : intentLoading ? 'Initializing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;