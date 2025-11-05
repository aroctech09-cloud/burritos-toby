import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, MapPin } from 'lucide-react';
import { useCart } from '../utils/cart';
import CartDropdown from './CartDropdown';

const Navbar = ({ onSearch }) => {
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartCount = getCartCount();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-[#3B1C08] text-white shadow-lg fixed w-full top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F47920] to-[#D62E2E] bg-clip-text text-transparent">
            Toby
          </h1>
          <p className="text-white font-medium">¡AH PA' BURRITOS!</p>
        </div>
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F47920] w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar burritos..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F47920]"
            />
          </div>
        </div>
      <div className="flex items-center gap-4">
  <motion.button
    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&origin=Mi+Ubicación&destination=Burritos+Toby,+Calle+Ignacio+Allende+832,+Zona+Centro,+25000+Saltillo,+Coah.', '_blank')}
    className="flex items-center gap-2 text-white hover:text-[#F47920] transition-colors"
    whileHover={{ scale: 1.05 }}
  >
            <MapPin className="w-5 h-5" />
            <span className="hidden md:block">Ubicación</span>
          </motion.button>
          <motion.button
            onClick={toggleCart}
            className="relative p-2 bg-[#F47920] rounded-full hover:bg-[#e66f1a]"
            whileHover={{ scale: 1.1 }}
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D62E2E] text-[#FFFFFF] text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
      {/* Mobile search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F47920] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F47920]"
          />
        </div>
      </div>
      <CartDropdown isOpen={isCartOpen} onClose={toggleCart} />
    </motion.nav>
  );
};

export default Navbar;