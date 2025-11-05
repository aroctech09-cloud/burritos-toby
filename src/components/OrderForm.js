import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, CreditCard, Truck, Home, MapPin, User } from 'lucide-react';
import { sucursales } from '../mock/products';

const OrderForm = ({ onClose, getTotal, sendToWhatsApp }) => {
  const [pago, setPago] = useState('efectivo');
  const [tipo, setTipo] = useState('llevar');
  const [ubicacion, setUbicacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [sucursal, setSucursal] = useState(sucursales[0]);
  const [copied, setCopied] = useState(false);

  const cuenta = '1234-5678-9012-3456'; // Número mock para transferencia

  const handleConfirm = () => {
    if (!nombre.trim()) return alert('Por favor ingresa tu nombre'); // Validación simple
    const orderDetails = {
      pago,
      tipo,
      ubicacion: tipo === 'domicilio' ? ubicacion : '',
      nombre
    };
    sendToWhatsApp(sucursal, orderDetails);
    onClose(); // Cierra todo el proceso
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Cierra al clic fuera
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()} // No cierra al clic dentro
      >
        {/* Botón de cerrar */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all"
          whileHover={{ scale: 1.1 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <h3 className="font-bold text-2xl text-[#3B1C08] mb-6 text-center">Detalles del Pedido</h3>

        {/* Horario */}
        <div className="bg-[#F47920]/10 p-4 rounded-2xl mb-6 text-center">
          <p className="text-gray-700 font-medium text-lg">
            Puedes pasar por tu pedido en un horario de
            <span className="text-[#F47920] font-bold"> 9am - 10pm</span>
          </p>
        </div>

        {/* Método de pago */}
        <div className="mb-6">
          <label className="block text-[#3B1C08] font-semibold mb-3 text-lg">Método de Pago</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <motion.button
              onClick={() => setPago('transferencia')}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3 justify-center ${pago === 'transferencia' ? 'border-[#F47920] bg-[#F47920]/10 text-[#F47920]' : 'border-gray-300 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <CreditCard className="w-5 h-5" />
              Transferencia Bancaria
            </motion.button>
            <motion.button
              onClick={() => setPago('efectivo')}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3 justify-center ${pago === 'efectivo' ? 'border-[#F47920] bg-[#F47920]/10 text-[#F47920]' : 'border-gray-300 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <Truck className="w-5 h-5" />
              Efectivo
            </motion.button>
          </div>
          {pago === 'transferencia' && (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <p className="text-gray-700 mb-3 font-medium">Número de cuenta bancaria:</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-full font-mono bg-white p-2 rounded-lg border text-gray-900">{cuenta}</span>
                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText(cuenta);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 bg-[#F47920] text-white rounded-xl font-medium flex items-center gap-2 hover:bg-[#e66f1a] transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? '¡Copiado!' : 'Copiar'}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Tipo de servicio */}
        <div className="mb-6">
          <label className="block text-[#3B1C08] font-semibold mb-3 text-lg">Tipo de Servicio</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <motion.button
              onClick={() => setTipo('comer')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${tipo === 'comer' ? 'border-[#F47920] bg-[#F47920]/10 text-[#F47920]' : 'border-gray-300 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <Home className="w-6 h-6" />
              Comer Ahí
            </motion.button>
            <motion.button
              onClick={() => setTipo('llevar')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${tipo === 'llevar' ? 'border-[#F47920] bg-[#F47920]/10 text-[#F47920]' : 'border-gray-300 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <MapPin className="w-6 h-6" />
              Para Llevar
            </motion.button>
            <motion.button
              onClick={() => setTipo('domicilio')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${tipo === 'domicilio' ? 'border-[#F47920] bg-[#F47920]/10 text-[#F47920]' : 'border-gray-300 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
            >
              <Truck className="w-6 h-6" />
              Domicilio
            </motion.button>
          </div>
          {tipo === 'domicilio' && (
            <div className="mt-3">
              <label className="block text-gray-700 mb-2">Ubicación para entrega</label>
              <input
                type="text"
                placeholder="Ej: Calle Falsa 123, Colonia Centro"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F47920] focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Nombre */}
        <div className="mb-6">
          <label className="block text-[#3B1C08] font-semibold mb-3 text-lg">Nombre de quien recogerá el pedido</label>
          <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-2xl">
            <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="flex-1 p-0 border-none outline-none text-lg placeholder-gray-500"
            />
          </div>
        </div>

        {/* Sucursal */}
        <div className="mb-6">
          <label className="block text-[#3B1C08] font-semibold mb-3 text-lg">Sucursal de recogida</label>
          <select
            value={sucursal.name}
            onChange={(e) => setSucursal(sucursales.find(s => s.name === e.target.value))}
            // CLASE AÑADIDA: text-gray-900 para forzar el color negro.
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F47920] focus:border-transparent text-lg text-gray-900"
          >
            {sucursales.map(s => (
              <option key={s.name} value={s.name} className="py-3">
                {s.name} - {s.direccion}
              </option>
            ))}
          </select>
        </div>

        {/* Total y confirmar */}
        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between text-xl font-bold text-[#3B1C08]">
            <span>Total del Pedido:</span>
            <span className="text-2xl text-[#F47920]">${getTotal().toFixed(2)}</span>
          </div>
          <motion.button
            onClick={handleConfirm}
            disabled={!nombre.trim()}
            className="w-full bg-gradient-to-r from-[#F47920] to-[#D62E2E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirmar Pedido y Enviar a WhatsApp
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderForm;