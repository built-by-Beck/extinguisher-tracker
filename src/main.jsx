import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Initialize Stripe if key is available
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// App component that handles Stripe initialization
const App = () => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (publishableKey && publishableKey.trim() !== '') {
      loadStripe(publishableKey)
        .then((stripeInstance) => {
          setStripe(stripeInstance);
        })
        .catch((error) => {
          console.warn('Failed to load Stripe (continuing without it):', error);
          // Don't set error state - just continue without Stripe
        });
    }
  }, []);

  // Always render Router immediately, wrap with Elements when Stripe loads
  // This ensures the app is visible right away
  const router = <Router />;
  
  if (stripe) {
    return (
      <Elements stripe={stripe}>
        {router}
      </Elements>
    );
  }

  // Render without Stripe wrapper - app works fine without it
  return router;
};

console.log('Starting app initialization...');
const root = document.getElementById('root');
if (root) {
  console.log('Root element found, rendering app...');
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render React app:', error);
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h1>Application Error</h1>
        <p>Failed to load the application.</p>
        <p style="color: red;">${error.message}</p>
        <p>Please check the browser console for more details.</p>
      </div>
    `;
  }
} else {
  console.error('Root element (#root) not found in HTML');
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; text-align: center;">
      <h1>Configuration Error</h1>
      <p>Root element (#root) not found in HTML. Please check index.html</p>
    </div>
  `;
}
