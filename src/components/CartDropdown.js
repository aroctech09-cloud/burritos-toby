import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../utils/cart';
import OrderForm from './OrderForm';

const CartDropdown = ({ isOpen, onClose }) => {
  const [showOrder, setShowOrder] = useState(false);
  const { cart, updateQuantity, removeFromCart, getTotal, sendToWhatsApp } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        // Cambio principal: Ocupa toda la pantalla en móvil (fixed inset-0), 
        // pero vuelve a ser un dropdown flotante en sm/md.
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="
          **fixed inset-0 w-full h-full**           **md:absolute md:top-full md:right-4 md:mt-2 md:h-auto md:max-h-[80vh]**           **md:w-96**           bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-50
          flex flex-col
        "
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#3B1C08]">Tu Carrito</h2>
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Contenido */}
        {/* Usamos 'flex-1' para que el contenido de la lista se estire y use todo el espacio vertical disponible */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400">¡Agrega algunos burritos deliciosos!</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#3B1C08] truncate">{item.name}</h3>
                      <p className="text-gray-600 text-sm">${item.price} c/u</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F47920] rounded"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="px-3 font-semibold text-[#3B1C08] min-w-[20px] text-center">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-[#F47920] text-white rounded hover:bg-[#e66f1a]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <span className="font-bold text-[#3B1C08] min-w-[50px] text-right">${(item.price * item.quantity).toFixed(0)}</span>
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Footer con total y botón */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-[#3B1C08]">Total:</span>
              <span className="text-2xl font-bold text-[#F47920]">${getTotal().toFixed(0)}</span>
            </div>
            <motion.button
              onClick={() => setShowOrder(true)}
              className="w-full bg-gradient-to-r from-[#F47920] to-[#D62E2E] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
            >
              Confirmar Pedido
            </motion.button>
          </div>
        )}

        {/* Formulario de orden si se muestra */}
        {showOrder && (
          <OrderForm
            onClose={() => setShowOrder(false)}
            getTotal={getTotal}
            sendToWhatsApp={sendToWhatsApp}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDropdown;