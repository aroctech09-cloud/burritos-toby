import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import CategorySection from './components/CategorySection';
import { products } from './mock/products';
import { CartProvider } from './utils/cart';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <CartProvider>
      <div className="bg-gradient-to-br from-[#F5CBA7]/20 via-white to-[#FDD36A]/10 min-h-screen pt-20 relative overflow-x-hidden">
        <Navbar onSearch={setSearchQuery} />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3B1C08] via-[#F47920] to-[#D62E2E] bg-clip-text text-transparent mb-4">
              Toby Burritos
            </h1>
            <p className="text-xl text-[#3B1C08]/80 font-medium">Descubre los sabores auténticos en cada bocado</p>
          </motion.div>

          {categories.map(category => (
            <CategorySection
              key={category}
              category={category}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </div>
    </CartProvider>
  );
};

export default App;