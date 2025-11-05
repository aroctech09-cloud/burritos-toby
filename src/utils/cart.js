import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const sendToWhatsApp = (sucursal, orderDetails) => {
    const itemsText = cart.map(item => `${item.name} x${item.quantity} - $${item.price * item.quantity}`).join('\n');
    const message = `Nuevo pedido de ${orderDetails.nombre}:\n${itemsText}\n\nTotal: $${getTotal()}\nMétodo: ${orderDetails.pago}\nTipo: ${orderDetails.tipo}${orderDetails.ubicacion ? `\nUbicación: ${orderDetails.ubicacion}` : ''}\nSucursal: ${sucursal.name}`;
    const url = `https://wa.me/${sucursal.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal, getCartCount, clearCart, sendToWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
};