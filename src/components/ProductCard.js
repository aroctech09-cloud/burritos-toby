import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../utils/cart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden group border border-gray-100 hover:border-[#F47920]/30 transition-all duration-300"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#3B1C08] mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#F47920]">${product.price}</span>
          <motion.button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-[#F47920] to-[#e66f1a] text-white p-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:block">Agregar</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;