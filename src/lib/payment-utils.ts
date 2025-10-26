import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export const createCheckoutSession = async (items: PaymentItem[], successUrl: string, cancelUrl: string) => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        successUrl,
        cancelUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
};

export const processPayment = async (items: PaymentItem[]) => {
  try {
    const sessionId = await createCheckoutSession(
      items,
      `${window.location.origin}/dashboard/orders?success=true`,
      `${window.location.origin}/cart?cancelled=true`
    );
    
    await redirectToCheckout(sessionId);
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
};

