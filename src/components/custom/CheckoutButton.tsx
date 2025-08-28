import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Initialize Stripe with publishable key
const stripePromise = loadStripe("pk_test_51S10w0DwzrKgflUCOeLdPRce2m1dLYs6JIMzOHMQ6XJYiFw5mlElcOZ6sHLU0b1FI438GDcfdcRJUHFGRUD7pdbK00teF0kH4i");

const CheckoutButton: React.FC = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    try {
      // Call backend to create a checkout session
      const response = await axios.post("payment/create-checkout-session", {
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      const sessionId = response.data.id;

      // Redirect using Stripe.js (publishable key required)
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error.message);
      }
    } catch (error: any) {
      console.error("Checkout error:", error.response?.data || error.message);
    }
  };

  return <button onClick={handleCheckout}>Pay $10</button>;
};

export default CheckoutButton;
