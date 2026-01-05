import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Initialize Stripe
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

// App wrapper component to conditionally use Elements
const App = () => {
  if (stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        <Router />
      </Elements>
    );
  }
  // If Stripe is not configured, still render the app (Stripe features won't work)
  return <Router />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
