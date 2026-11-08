import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
