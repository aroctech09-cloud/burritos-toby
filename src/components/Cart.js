import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, CreditCard, Truck, Home, User, MapPin } from 'lucide-react';
import { useCart } from '../utils/cart';
import { branches, bankAccount } from '../mock/branches';

const Cart = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [serviceType, setServiceType] = useState('carryout');
  const [address, setAddress] = useState('');
  const [pickerName, setPickerName] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleConfirm = () => {
    if (cart.length === 0) return;

    const itemsText = cart.map(item => 
      `${item.quantity}x ${item.name} - $${item.price * item.quantity}`
    ).join('\n');
    
    const paymentText = paymentMethod === 'transfer' 
      ? `Pago por transferencia bancaria a: ${bankAccount}` 
      : 'Pago en efectivo';
    
    const serviceText = serviceType === 'delivery' 
      ? `Domicilio a: ${address}` 
      : serviceType === 'dinein' 
        ? 'Comer en el lugar' 
        : 'Para llevar';
    
    // Incluimos el nombre del recogedor y la sucursal en el mensaje de WhatsApp
    const message = `¡Nuevo pedido!\n\nItems:\n${itemsText}\n\nTotal: $${getTotal()}\n\nMétodo de pago: ${paymentText}\nTipo de servicio: ${serviceText}\nNombre del recogedor: ${pickerName}\nSucursal: ${selectedBranch.name}\n\n¡Gracias!`;

    const whatsappUrl = `https://wa.me/${selectedBranch.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setShowConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Contenedor principal del Carrito: Ocupa todo el ancho (w-full) en móvil y 96 en pantallas medianas o más grandes (sm:w-96) */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed top-0 right-0 h-full **w-full sm:w-96** bg-white shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#3B1C08]">Tu Carrito</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-8"
              >
                Tu carrito está vacío. ¡Agrega algunos burritos deliciosos!
              </motion.p>
            ) : (
              <>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price} c/u</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#3B1C08] text-white flex items-center justify-center hover:bg-[#2D1405]"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold text-[#3B1C08]">${item.price * item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-4 mt-6 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-[#3B1C08]">${getTotal()}</span>
                  </div>
                  <motion.button
                    onClick={() => setShowConfirm(true)}
                    className="w-full mt-4 bg-[#3B1C08] hover:bg-[#2D1405] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    Confirmar Pedido
                  </motion.button>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirm(false)}
        >
          {/* 2. Modal de Confirmación: Usamos un padding más compacto en móvil (p-6) y más amplio en pantallas grandes (sm:p-8) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl **p-6 sm:p-8** max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#3B1C08] mb-4">Detalles del Pedido</h3>
           
            <div className="space-y-4 mb-4">
              <p className="text-sm text-gray-600">
                Puedes pasar por tu pedido en un horario de <strong>9:00 AM - 10:00 PM</strong>.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-[#3B1C08]">Método de Pago</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex-1 p-3 rounded-xl border-2 ${paymentMethod === 'transfer' ? 'border-[#3B1C08] bg-[#3B1C08]/10' : 'border-gray-200'} flex items-center gap-2`}
                >
                  <CreditCard size={20} />
                  Transferencia
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex-1 p-3 rounded-xl border-2 ${paymentMethod === 'cash' ? 'border-[#3B1C08] bg-[#3B1C08]/10' : 'border-gray-200'} flex items-center gap-2`}
                >
                  <Truck size={20} />
                  Efectivo
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-sm text-gray-700 mb-2">Cuenta: <strong>{bankAccount}</strong></p>
                  <button
                    onClick={() => navigator.clipboard.writeText(bankAccount)}
                    className="w-full bg-[#3B1C08] text-white py-2 rounded-lg text-sm"
                  >
                    Copiar Cuenta
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-[#3B1C08]">Tipo de Servicio</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setServiceType('dinein')}
                  className={`w-full p-3 rounded-xl border-2 flex items-center gap-2 ${serviceType === 'dinein' ? 'border-[#3B1C08] bg-[#3B1C08]/10' : 'border-gray-200'}`}
                >
                  <Home size={20} />
                  Comer Aquí
                </button>
                <button
                  onClick={() => setServiceType('carryout')}
                  className={`w-full p-3 rounded-xl border-2 flex items-center gap-2 ${serviceType === 'carryout' ? 'border-[#3B1C08] bg-[#3B1C08]/10' : 'border-gray-200'}`}
                >
                  <MapPin size={20} />
                  Para Llevar
                </button>
                {serviceType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Dirección de entrega"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl"
                  />
                )}
                <button
                  onClick={() => setServiceType('delivery')}
                  className={`w-full p-3 rounded-xl border-2 flex items-center gap-2 ${serviceType === 'delivery' ? 'border-[#3B1C08] bg-[#3B1C08]/10' : 'border-gray-200'}`}
                >
                  <Truck size={20} />
                  Domicilio
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">Nombre de quien recogerá</label>
              <input
                type="text"
                value={pickerName}
                onChange={(e) => setPickerName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full p-3 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">Sucursal</label>
              <select
                value={selectedBranch.id}
                onChange={(e) => setSelectedBranch(branches.find(b => b.id === e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-xl"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} - {branch.address}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              onClick={handleConfirm}
              className="w-full bg-[#3B1C08] hover:bg-[#2D1405] text-white py-3 rounded-xl font-semibold"
              whileHover={{ scale: 1.02 }}
              disabled={pickerName.trim() === '' || (serviceType === 'delivery' && address.trim() === '')}
            >
              Confirmar y Enviar a WhatsApp
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Cart;